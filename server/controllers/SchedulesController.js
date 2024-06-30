const Schedule = require("../models/Schedules");
const Student = require("../models/Students");
const Logs = require("../models/Logs");
const TempSchedule = require("../models/TempSchedules");
const TempSolo = require("../models/TempSoloSchedules");
const History = require("../models/History");
const uniqid = require("uniqid");
const cron = require("node-cron");
const moment = require("moment");
const Notification = require("../models/Notifications");
const User = require("../models/Users");
const api_base_url = "https://api.zoom.us/v2";
const axios = require("axios");

// schedule

let config = {
  method: "post",
  maxBodyLength: Infinity,
  url: "https://zoom.us/oauth/token?grant_type=account_credentials&account_id=dfAO9bUiQReK7iXGUBgdbQ",
  headers: {
    Authorization:
      "Basic R1NfRTFVaGtUV0t3eVJUa2JkS0Z1UTo4TEIzaWJ5Nk04Q3FFZzBYcE1yODk3QXR1ZWhJYllZTg==",
  },
};

const createZoomLink = async (req, res) => {
  const { id } = req.params;
  const { randomString, day, timing } = req.body;

  try {
    let authResponse;

    await axios
      .request(config)
      .then((response) => {
        authResponse = response.data;
      })
      .catch((error) => {
        console.error("Error in authentication request:", error);
        return res.status(500).json({
          message: "Error in authentication request.",
        });
      });

    const access_token = authResponse.access_token;

    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };

    const today = new Date();
    const nextFiveDays = [];

    for (let i = 0; nextFiveDays.length < 6; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);

      const dayOfWeek = nextDate.toLocaleDateString("en-US", {
        weekday: "long",
      });

      nextFiveDays.push({
        date: nextDate,
        day: dayOfWeek,
      });
    }

    const startDate = () => {
      return nextFiveDays
        .filter((date) => date.day === day)
        .map((date) => date.date);
    };

    const startTime = () => {
      const times = {
        "8:00 AM - 9:00 AM": "08:00:00",
        "9:00 AM - 10:00 AM": "09:00:00",
        "10:00 AM - 11:00 AM": "10:00:00",
        "11:00 AM - 12:00 NN": "11:00:00",
        "12:00 NN - 1:00 PM": "12:00:00",
        "1:00 PM - 2:00 PM": "13:00:00",
        "2:00 PM - 3:00 PM": "14:00:00",
        "3:00 PM - 4:00 PM": "15:00:00",
        "4:00 PM - 5:00 PM": "16:00:00",
      };
      return times[timing];
    };

    const officialStartTime = moment(`${startDate()}T${startTime()}`);
    console.log("Official Start Time:", officialStartTime);

    let data = JSON.stringify({
      topic: "MLAC Online Scheduled Therapy",
      type: 2,
      start_time: officialStartTime?.utc().format(),
      duration: 40,
      password: randomString,
      settings: {
        allow_multiple_devices: true,
        join_before_host: true,
        waiting_room: false,
      },
    });

    console.log("Payload Data:", data);

    const meetingResponse = await axios.post(
      `${api_base_url}/users/me/meetings`,
      data,
      { headers }
    );

    if (meetingResponse.status !== 201) {
      console.error("Error creating Zoom meeting:", meetingResponse.status);
      return res.status(500).json({
        message: "Error creating Zoom meeting",
      });
    }

    const response_data = meetingResponse.data;

    const content = {
      meeting_url: response_data.join_url,
      meetingTime: response_data.start_time,
      purpose: response_data.topic,
      duration: response_data.duration,
      message: "Success",
      password: randomString,
      status: 1,
    };

    await Schedule.findByIdAndUpdate(
      id,
      {
        zoomLink: content,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Zoom link has been created successfully.",
    });
  } catch (error) {
    console.error("Error creating Zoom link.", error);
    res.status(500).json({
      message: "Error creating Zoom link.",
    });
  }
};

const deleteExpiredZoomLinks = async (req, res) => {
  let authResponse;

  await axios
    .request(config)
    .then((response) => {
      authResponse = response.data;
    })
    .catch((error) => {
      console.error("Error in authentication request:", error);
      return res.status(500).json({
        message: "Error in authentication request.",
      });
    });

  const access_token = authResponse.access_token;

  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };

  try {
    const schedules = await Schedule.find({
      "zoomLink.meetingTime": { $exists: true },
    });

    const now = new Date();

    for (const schedule of schedules) {
      const meetingTime = new Date(schedule.zoomLink.meetingTime);

      if (now > meetingTime) {
        const meetingId = schedule.zoomLink.meeting_url.split("/").pop();

        await axios.delete(`${api_base_url}/meetings/${meetingId}`, {
          headers,
        });

        await Schedule.findByIdAndUpdate(schedule._id, {
          $unset: { zoomLink: "" },
        });

        console.log(`Deleted expired meeting for schedule ID: ${schedule._id}`);
      }
    }
  } catch (error) {
    console.error("Error deleting expired Zoom links.", error);
  }
};

const createSchedule = async (req, res) => {
  const { day, timing, studentType, nameOfStudent, studentId } = req.body;
  const userData = req.user;

  try {
    // Check for existing schedules
    const scheduleExists = await Schedule.exists({
      $and: [{ studentType: "Solo" }, { day: day }, { timing: timing }],
    });

    const isVideoExistsPerm = await Schedule.exists({
      $and: [{ isVideoOn: "On" }, { day: day }, { timing: timing }],
    });

    const dyadExists = await Schedule.exists({
      $and: [{ studentType: "Dyad" }, { day: day }, { timing: timing }],
    });

    const dyadTempExists = await TempSchedule.exists({
      $and: [{ studentType: "Dyad" }, { day: day }, { timing: timing }],
    });

    const tempSoloScheduleExists = await TempSolo.exists({
      $and: [{ day: day }, { timing: timing }],
    });

    // Conflict checks
    if (scheduleExists) {
      return res.status(409).json({
        message: "You cannot duplicate existing schedules.",
      });
    } else if (dyadExists && studentType === "Solo") {
      return res.status(409).json({
        message: "You cannot combine solo schedules with any other schedules.",
      });
    } else if (isVideoExistsPerm) {
      return res.status(409).json({
        message:
          "You cannot combine online permanent schedules with offline permanent schedules.",
      });
    } else if (dyadTempExists && studentType === "Solo") {
      return res.status(409).json({
        message:
          "You cannot combine temporary dyad schedules with solo schedules or temporary solo schedules.",
      });
    } else if (tempSoloScheduleExists) {
      return res.status(409).json({
        message:
          "You cannot combine temporary solo schedules with any other schedules.",
      });
    }

    // Create and save new schedule
    const newSchedule = new Schedule({
      ...req.body,
      scheduleId: uniqid(),
    });

    const savedSchedule = await newSchedule.save();

    // Send success response
    res.status(200).json({
      data: savedSchedule,
      message: `A permanent schedule has been created for your child ${nameOfStudent}`,
    });

    // Create and push notification
    const notification = await Notification.create({
      sender: userData._id,
      type: "Schedules",
      message: `A permanent schedule has been created for your child ${nameOfStudent}`,
      createdAt: new Date(),
    });

    const student = await Student.findOne({ _id: studentId }).populate(
      "parent"
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await User.findByIdAndUpdate(student.parent._id, {
      $push: { notifications: notification._id },
    });

    // Add to history
    await History.create({
      userId: userData._id,
      typeOfNotif: "Schedules",
      actionOfNotif: "Add",
      message: "Successful on adding a new schedule.",
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error adding schedule:", error);
    res.status(500).json({
      message: "Error adding schedule to database.",
    });
  }
};

const getSchedule = async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate("studentId", "studentNo studentType parent")
      .exec();
    res.status(200).json({
      schedules,
      message: "Successful getting the schedules!",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occurred, please try again!" });
  }
};

const isVideoOff = async () => {
  const userData = req.user;

  try {
    const currentDay = new Date().toLocaleString("en-us", { weekday: "long" });
    await updateSchedulesForDay(currentDay);

    const notification = await Notification.create({
      sender: userData._id,
      type: "Automatic",
      message:
        "Resetting video status to 'No information yet' for past schedules",
      createdAt: new Date(),
    });

    await User.findByIdAndUpdate(userData._id, {
      $push: { notifications: notification._id },
    });
  } catch (error) {
    console.error("Error updating schedules:", error);
  }
};

const updateSchedulesForDay = async (day) => {
  try {
    await Schedule.updateMany({ day }, { isVideoOn: "Off" });
    console.log(`Updated schedules for ${day}`);
  } catch (error) {
    throw new Error(`Failed to update schedules for ${day}: ${error.message}`);
  }
};

const isVideoOffHandler = () => {
  cron.schedule("59 23 * * *", isVideoOff);
};

isVideoOffHandler();

const isActiveDef = async () => {
  const userData = req.user;

  try {
    const currentDay = new Date().toLocaleString("en-us", { weekday: "long" });
    await updateSchedulesIsActiveDef(currentDay);

    const notification = await Notification.create({
      sender: userData._id,
      type: "Automatic",
      message:
        "Resetting permanent schedule status to 'No information yet' for past schedules",
      createdAt: new Date(),
    });

    await User.findByIdAndUpdate(userData._id, {
      $push: { notifications: notification._id },
    });
  } catch (error) {
    console.error("Error updating schedules:", error);
  }
};

const updateSchedulesIsActiveDef = async (day) => {
  try {
    await Schedule.updateMany({ day }, { isActive: "No information yet" });
    console.log(`Updated schedules for ${day}`);
  } catch (error) {
    throw new Error(`Failed to update schedules for ${day}: ${error.message}`);
  }
};

const isActiveDefHandler = () => {
  cron.schedule("59 23 * * *", isActiveDef);
};

isActiveDefHandler();

const getOneSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateOneSchedule = async (req, res) => {
  const { id } = req.params;

  const userData = req.user;

  try {
    const schedule = await Schedule.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    const notification = await Notification.create({
      sender: userData._id,
      type: "Schedules",
      message: `${schedule.nameOfStudent} schedule has been updated.`,
      createdAt: new Date(),
    });

    const student = await Student.findOne({ _id: schedule.studentId }).populate(
      "parent"
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await User.findByIdAndUpdate(student.parent._id, {
      $push: { notifications: notification._id },
    });

    res.status(200).json({
      schedule,
      message: `${schedule.nameOfStudent} schedule has been updated.`,
    });
  } catch (error) {
    return res.status(400).json({ message: "Error updating schedule" });
  }
};

const updateScheduleReason = async (req, res) => {
  try {
    const userData = req.user;

    const { nameOfStudent } = req.body;

    const { id } = req.params;

    const schedule = await Schedule.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    await History.create({
      userId: userData._id,
      typeOfNotif: "Schedules",
      actionOfNotif: "Update One",
      message: `${nameOfStudent}'s schedule reason has been added succesfully.`,
      createdAt: new Date(),
    });

    res.status(200).json({
      data: schedule,
      message: `${nameOfStudent}'s schedule reason has been added succesfully.`,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update schedule reason" });
  }
};

const deleteOneSchedule = async (req, res) => {
  const userData = req.user;
  const { id } = req.params;

  try {
    const deletedSched = await Schedule.findByIdAndDelete(id);

    if (!deletedSched) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    const notification = await Notification.create({
      sender: userData._id,
      type: "Schedules",
      message: `${deletedSched.nameOfStudent} schedule has been deleted successfully.`,
      createdAt: new Date(),
    });

    const student = await Student.findOne({
      _id: deletedSched.studentId,
    }).populate("parent");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await User.findByIdAndUpdate(student.parent._id, {
      $push: { notifications: notification._id },
    });

    res.status(200).json({
      message: `${deletedSched.nameOfStudent} schedule has been deleted successfully.`,
    });
  } catch (err) {
    res.status(400).json({ message: "Error deleting schedule" });
  }
};

const deleteManySchedule = async (req, res) => {
  const { schedules } = req.body;
  const userData = req.user;

  try {
    await Schedule.deleteMany({ _id: { $in: schedules } });

    // pag gusto mo i update yung objects sa isang array ng isa isa ganto gawin mo, i loop mo
    // like gusto mo gumawa ng notif per schedule tas hanapin yung mga parent ng schedules na yun tas don mo lalagay notif mo

    for (const scheduleId of schedules) {
      const deletedSched = await Schedule.findById(scheduleId).populate(
        "studentId"
      );

      if (!deletedSched) {
        console.error(`Schedule with ID ${scheduleId} not found`);
        continue;
      }

      const notification = await Notification.create({
        sender: userData._id,
        type: "Schedules",
        message: `${deletedSched?.studentId?.firstName} ${deletedSched?.studentId?.surName} schedule has been deleted successfully.`,
        createdAt: new Date(),
      });

      const student = await Student.findById(
        deletedSched.studentId._id
      ).populate("parent");

      if (!student) {
        console.error(
          `Student with ID ${deletedSched.studentId._id} not found`
        );
        continue;
      }

      await User.findByIdAndUpdate(student.parent._id, {
        $push: { notifications: notification._id },
      });
    }

    await History.create({
      userId: userData._id,
      typeOfNotif: "Schedule",
      actionOfNotif: "Delete",
      message: `Selected schedules has been deleted successfully.`,
      createdAt: new Date(),
    });

    res
      .status(200)
      .json({ message: "Selected schedules has been deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const setVideo = async (req, res) => {
  try {
    const { isVideoOn } = req.body;
    await Schedule.findByIdAndUpdate(req.params.id, { isVideoOn });
    res.status(200).json({ message: "Video status has been updated." });
  } catch (error) {
    res.status(500).json({ error: "Failed to updaet video status." });
  }
};

const createTempSchedule = async (req, res) => {
  const { day, timing, dateTime, studentName, studentId, companion } = req.body;
  const userData = req.user;

  const today = moment();
  const tomorrow = moment().add(1, "day").startOf("day");

  const companionStudent = await Schedule.find({ _id: companion });

  if (day === companionStudent.day) {
    return res
      .status(409)
      .json({ message: "You cannot schedule on the same day." });
  }

  if (moment(dateTime).isSame(today, "day")) {
    return res
      .status(409)
      .json({ message: "You cannot schedule on the same date." });
  }

  if (moment(dateTime).isBefore(today, "day")) {
    return res
      .status(409)
      .json({ message: "You can't select a date in the past." });
  }

  if (moment(dateTime).isAfter(tomorrow.clone().add(5, "days"), "day")) {
    return res
      .status(409)
      .json({ message: "Selected date is more than 6 days from tomorrow!" });
  }

  const scheduleExists = await Schedule.exists({
    $and: [{ studentType: "Solo" }, { day: day }, { timing: timing }],
  });

  if (scheduleExists) {
    return res.status(409).json({
      message:
        "You cannot combine temporary dyad schedules with solo schedules.",
    });
  }

  const tempSoloScheduleExists = await TempSolo.exists({
    $and: [{ day: day }, { timing: timing }],
  });

  if (tempSoloScheduleExists) {
    return res.status(409).json({
      message:
        "You cannot combine temporary dyad schedules with temporary solo schedules.",
    });
  }

  try {
    const tempSchedule = await new TempSchedule({
      ...req.body,
      scheduleId: uniqid(),
    }).save();

    const notification = await Notification.create({
      sender: userData._id,
      type: "Schedules",
      message: `A temporary schedule has been created for your child ${studentName}`,
      createdAt: new Date(),
    });

    const student = await Student.findOne({ _id: studentId }).populate(
      "parent"
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await User.findByIdAndUpdate(student.parent._id, {
      $push: { notifications: notification._id },
    });

    res.status(200).json({
      data: tempSchedule,
      message: "A new temporary schedule has been added.",
    });
  } catch (err) {
    res.status(400).json({
      message: "Error creating temporary schedule. Please try again.",
    });
  }
};

const getTempSchedule = async (req, res) => {
  try {
    const temporarySchedules = await TempSchedule.find()
      .populate(
        "companion",
        "day timing parent nameOfStudent studentType scheduleType scheduleId isVideoOn"
      )
      .populate(
        "student",
        "day timing parent nameOfStudent studentType scheduleType scheduleId isVideoOn"
      )
      .populate("studentId", "behindByCounter")
      .exec();

    res.status(200).json({ tempSchedules: temporarySchedules });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error getting temporary schedules." });
  }
};

const deleteOneTempSchedule = async (req, res) => {
  const userData = req.user;

  try {
    const deletedTempSched = await TempSchedule.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTempSched) {
      return res
        .status(404)
        .json({ message: "Sorry, we can't find your schedule." });
    }

    const notification = await Notification.create({
      sender: userData._id,
      type: "Schedules",
      message: `${deletedTempSched.studentName} schedule has been deleted successfully.`,
      createdAt: new Date(),
    });

    const student = await Student.findOne({
      _id: deletedTempSched.studentId,
    }).populate("parent");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await User.findByIdAndUpdate(student.parent._id, {
      $push: { notifications: notification._id },
    });

    res.status(200).json({
      message: "Your temporary schedule has been deleted successfully.",
      success: true,
    });
  } catch (err) {
    res.status(400).json({ message: "Error deleting your schedule." });
  }
};

const deleteTempSchedules = async (req, res) => {
  const userData = req.user;

  try {
    const currentDate = new Date();

    const schedules = await TempSchedule.find({
      dateTime: { $lt: currentDate },
    });

    await Logs.insertMany(schedules);

    const tempScheduleAttendanceStatusReset = schedules.map((schedule) => {
      return Schedule.updateOne(
        { _id: schedule?.student },
        {
          $set: { isActive: "No information" },
        }
      );
    });

    const studentBehindByCounterUpdate = async () => {
      for (const schedule of schedules) {
        const student = await Student.findById(schedule?.studentId);
        if (student) {
          const currentCounter = student.behindByCounter;
          const incrementValue =
            schedule.isActive === "Absent" ||
            schedule.isActive === "No information"
              ? 0
              : currentCounter <= 0
              ? 0
              : -1;

          await Student.updateOne(
            { _id: schedule?.studentId },
            {
              $inc: { behindByCounter: incrementValue },
            }
          );
        }
      }
    };

    await Promise.all(
      tempScheduleAttendanceStatusReset,
      studentBehindByCounterUpdate
    );

    await TempSchedule.deleteMany({
      dateTime: { $lt: currentDate },
    });

    for (const scheduleId of schedules) {
      const deletedSched = await Schedule.findById(scheduleId).populate(
        "studentId"
      );

      if (!deletedSched) {
        console.error(`Schedule with ID ${scheduleId} not found`);
        continue;
      }

      const notification = await Notification.create({
        sender: userData._id,
        type: "Schedules",
        message: `${deletedSched?.studentId?.firstName} ${deletedSched?.studentId?.surName} temporary schedule has been deleted successfully.`,
        createdAt: new Date(),
      });

      const student = await Student.findById(
        deletedSched.studentId._id
      ).populate("parent");

      if (!student) {
        console.error(
          `Student with ID ${deletedSched.studentId._id} not found`
        );
        continue;
      }

      await User.findByIdAndUpdate(student.parent._id, {
        $push: { notifications: notification._id },
      });
    }

    res.status(200).json({
      message:
        "Expired temporary schedules has been cloned and deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error cloning and deleting expired temporary schedules.",
    });
  }
};

const deleteManyTempSchedule = async (req, res) => {
  try {
    const { tempSchedules } = req.body;
    const userData = req.user;

    await TempSchedule.deleteMany({ _id: { $in: tempSchedules } });

    for (const scheduleId of tempSchedules) {
      const deletedSched = await Schedule.findById(scheduleId).populate(
        "studentId"
      );

      if (!deletedSched) {
        console.error(`Schedule with ID ${scheduleId} not found`);
        continue;
      }

      const notification = await Notification.create({
        sender: userData._id,
        type: "Schedules",
        message: `${deletedSched?.studentId?.firstName} ${deletedSched?.studentId?.surName} schedule has been deleted successfully.`,
        createdAt: new Date(),
      });

      const student = await Student.findById(
        deletedSched.studentId._id
      ).populate("parent");

      if (!student) {
        console.error(
          `Student with ID ${deletedSched.studentId._id} not found`
        );
        continue;
      }

      await User.findByIdAndUpdate(student.parent._id, {
        $push: { notifications: notification._id },
      });
    }

    await History.create({
      userId: userData._id,
      typeOfNotif: "Schedule",
      actionOfNotif: "Delete",
      message: "Selected schedules has been deleted successfully.",
      createdAt: new Date(),
    });

    res
      .status(200)
      .json({ message: "Selected schedules has been deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

const setTempVideo = async (req, res) => {
  try {
    const { isVideoOn } = req.body;
    await TempSchedule.findByIdAndUpdate(req.params.id, { isVideoOn });
    res.status(200).json({ message: "Video status has been updated." });
  } catch (error) {
    res.status(500).json({ error: "Failed to updaet video status." });
  }
};

// // temporary solo schedule

const createTempSoloSchedule = async (req, res) => {
  const { day, timing, dateTime, studentName, studentId } = req.body;
  const userData = req.user;

  const today = moment();
  const tomorrow = moment().add(1, "day").startOf("day");

  if (moment(dateTime).isSame(today, "day")) {
    return res
      .status(409)
      .json({ message: "You can't schedule on the same day." });
  }

  if (moment(dateTime).isBefore(today, "day")) {
    return res
      .status(409)
      .json({ message: "You can't select a date in the past." });
  }

  if (moment(dateTime).isAfter(tomorrow.clone().add(5, "days"), "day")) {
    return res
      .status(409)
      .json({ message: "Selected date is more than 6 days from tomorrow!" });
  }

  const scheduleExists = await Schedule.exists({
    $and: [
      { isActive: "Present" || "No information yet" },
      { day: day },
      { timing: timing },
    ],
  });

  if (scheduleExists) {
    return res.status(409).json({
      message: "You cannot create temporary solo schedule on occupied slots.",
    });
  }

  const tempScheduleExists = await TempSchedule.exists({
    $and: [{ day: day }, { timing: timing }],
  });

  if (tempScheduleExists) {
    return res
      .status(409)
      .json({ message: "You can't schedule on occupied slots." });
  }

  try {
    const schedule = await new TempSolo({
      ...req.body,
      scheduleId: uniqid(),
    }).save();

    const notification = await Notification.create({
      sender: userData._id,
      type: "Schedules",
      message: `A temporary solo schedule has been created for your child ${studentName}`,
      createdAt: new Date(),
    });

    const student = await Student.findOne({ _id: studentId }).populate(
      "parent"
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await User.findByIdAndUpdate(student.parent._id, {
      $push: { notifications: notification._id },
    });

    res.status(200).json({
      data: schedule,
      message: "Temporary solo schedule has been added successfully.",
    });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "Error on creating temporary solo schedule." });
  }
};

const getTempSoloSchedule = async (req, res) => {
  try {
    const temporarySoloSchedules = await TempSolo.find()
      .populate(
        "student",
        "day timing parent nameOfStudent studentType scheduleType scheduleId isVideoOn"
      )
      .exec();
    res.status(200).json({ tempSoloSchedules: temporarySoloSchedules });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error getting temporary schedules." });
  }
};

const deleteOneTempSoloSchedule = async (req, res) => {
  const userData = req.user;

  try {
    const deletedTempSoloSched = await TempSolo.findByIdAndDelete(
      req.params.id
    );

    if (!deletedTempSoloSched) {
      return res
        .status(404)
        .json({ message: "Sorry, schedule does not exist." });
    }

    const notification = await Notification.create({
      sender: userData._id,
      type: "Schedules",
      message: `${deletedTempSoloSched.studentName} schedule has been deleted successfully.`,
      createdAt: new Date(),
    });

    const student = await Student.findOne({
      _id: deletedTempSoloSched.studentId,
    }).populate("parent");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await User.findByIdAndUpdate(student.parent._id, {
      $push: { notifications: notification._id },
    });

    res.status(200).json({
      message: `${deletedTempSoloSched.studentName} schedule has been deleted successfully.`,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error deleting temporary solo schedule." });
  }
};

const deleteTempSoloSchedules = async (req, res) => {
  const userData = req.user;

  try {
    const currentDate = new Date();

    const schedules = await TempSolo.find({
      dateTime: { $lt: currentDate },
    });

    await Logs.insertMany(schedules);

    const tempSoloScheduleAttendanceStatusReset = schedules.map((schedule) => {
      return Schedule.updateOne(
        { _id: schedule?.student },
        {
          $set: { isActive: "No information" },
        }
      );
    });

    const studentBehindByCounterUpdate = schedules.map((schedule) => {
      return Student.updateOne(
        { _id: schedule?.studentId },
        {
          $inc: {
            behindByCounter:
              schedule.isActive === "Absent" ||
              schedule.isActive === "No information"
                ? 0
                : schedule?.studentId?.behindByCounter <= 0
                ? 0
                : -1,
          },
        }
      );
    });

    await Promise.all(
      tempSoloScheduleAttendanceStatusReset,
      studentBehindByCounterUpdate
    );

    await TempSolo.deleteMany({
      dateTime: { $lt: currentDate },
    });

    for (const scheduleId of schedules) {
      const deletedSched = await Schedule.findById(scheduleId).populate(
        "studentId"
      );

      if (!deletedSched) {
        console.error(`Schedule with ID ${scheduleId} not found`);
        continue;
      }

      const notification = await Notification.create({
        sender: userData._id,
        type: "Schedules",
        message: `${deletedSched?.studentId?.firstName} ${deletedSched?.studentId?.surName} temporary schedule has been deleted successfully.`,
        createdAt: new Date(),
      });

      const student = await Student.findById(
        deletedSched.studentId._id
      ).populate("parent");

      if (!student) {
        console.error(
          `Student with ID ${deletedSched.studentId._id} not found`
        );
        continue;
      }

      await User.findByIdAndUpdate(student.parent._id, {
        $push: { notifications: notification._id },
      });
    }

    res.status(200).json({
      message:
        "Expired temporary solo schedules has been cloned and deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error cloning and deleting expired temporary solo schedules.",
    });
  }
};

const deleteManyTempSoloSchedule = async (req, res) => {
  try {
    const { tempSoloSchedules } = req.body;
    const userData = req.user;

    await TempSolo.deleteMany({ _id: { $in: tempSoloSchedules } });

    await History.create({
      userId: userData._id,
      typeOfNotif: "Schedule",
      actionOfNotif: "Delete",
      message: "Selected schedules has been deleted successfully.",
      createdAt: new Date(),
    });

    for (const scheduleId of tempSoloSchedules) {
      const deletedSched = await Schedule.findById(scheduleId).populate(
        "studentId"
      );

      if (!deletedSched) {
        console.error(`Schedule with ID ${scheduleId} not found`);
        continue;
      }

      const notification = await Notification.create({
        sender: userData._id,
        type: "Schedules",
        message: `${deletedSched?.studentId?.firstName} ${deletedSched?.studentId?.surName} schedule has been deleted successfully.`,
        createdAt: new Date(),
      });

      const student = await Student.findById(
        deletedSched.studentId._id
      ).populate("parent");

      if (!student) {
        console.error(
          `Student with ID ${deletedSched.studentId._id} not found`
        );
        continue;
      }

      await User.findByIdAndUpdate(student.parent._id, {
        $push: { notifications: notification._id },
      });
    }

    res
      .status(200)
      .json({ message: "Selected schedules has been deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

const setTempSoloVideo = async (req, res) => {
  try {
    const { isVideoOn } = req.body;
    await TempSolo.findByIdAndUpdate(req.params.id, { isVideoOn });
    res.status(200).json({ message: "Video status has been updated." });
  } catch (error) {
    res.status(500).json({ error: "Failed to updaet video status." });
  }
};

// // setting isActive state

// const setActive = async (req, res) => {
//   try {
//     const { isActive } = req.body;
//     await Schedule.findByIdAndUpdate(req.params.id, { isActive });
//     res.status(200).json({ message: "Active status changed." });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to change active status." });
//   }
// };

// const setActiveTemp = async (req, res) => {
//   try {
//     const { isActive } = req.body;
//     await TempSchedule.findByIdAndUpdate(req.params.id, { isActive });
//     res.status(200).json({ message: "Active status changed." });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to change active status." });
//   }
// };

// const setActiveTempSolo = async (req, res) => {
//   try {
//     const { isActive } = req.body;
//     await TempSolo.findByIdAndUpdate(req.params.id, { isActive });
//     res.status(200).json({ message: "Active status changed." });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to change active status." });
//   }
// };

// const setVideoTempSolo = async (req, res) => {
//   try {
//     const { isVideoOn } = req.body;
//     await TempSolo.findByIdAndUpdate(req.params.id, { isVideoOn });
//     res.status(200).json({ message: "Active status changed." });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to change active status." });
//   }
// };

// // setting absentCounter

// const setPlusAbsentCounter = async (req, res) => {
//   try {
//     const { absentCounter } = req.body;
//     await Schedule.findByIdAndUpdate(req.params.id, { absentCounter });
//     res.status(200).json({ message: "Active status changed." });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to change active status." });
//   }
// };

// const setMinusAbsentCounter = async (req, res) => {
//   try {
//     const { absentCounter } = req.body;
//     await Schedule.findByIdAndUpdate(req.params.id, { absentCounter });
//     res.status(200).json({ message: "Active status changed." });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to change active status." });
//   }
// };

// //progress report

// const setWaitlistStatus = async (req, res) => {
//   try {
//     const { isWaitlisted } = req.body;
//     const updatedSchedule = await Schedule.findByIdAndUpdate(
//       req.params.id,
//       { isWaitlisted },
//       { new: true }
//     );

//     if (!updatedSchedule) {
//       return res.status(404).json({ error: "Schedule not found." });
//     }

//     res.status(200).json({
//       message: "isWaitlisted status changed.",
//       updatedSchedule,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to change active status." });
//   }
// };

module.exports = {
  createSchedule,
  getSchedule,
  getOneSchedule,
  updateOneSchedule,
  updateScheduleReason,
  deleteOneSchedule,
  deleteManySchedule,

  createTempSchedule,
  getTempSchedule,
  deleteOneTempSchedule,
  deleteTempSchedules,
  deleteManyTempSchedule,

  createTempSoloSchedule,
  getTempSoloSchedule,
  deleteOneTempSoloSchedule,
  deleteTempSoloSchedules,
  deleteManyTempSoloSchedule,

  //

  setVideo,
  setTempVideo,
  setTempSoloVideo,

  // setActive,
  // setActiveTemp,
  // setActiveTempSolo,
  // setVideo,
  // setVideoTempSolo,
  // setWaitlistStatus,

  isVideoOffHandler,
  isActiveDefHandler,

  //

  createZoomLink,
  deleteExpiredZoomLinks,

  // setPlusAbsentCounter,
  // setMinusAbsentCounter,
};
