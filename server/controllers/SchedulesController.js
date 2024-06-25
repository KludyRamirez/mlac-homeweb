const Schedule = require("../models/Schedules");
const Student = require("../models/Students");
const Logs = require("../models/Logs");
const TempSchedule = require("../models/TempSchedules");
const TempSolo = require("../models/TempSoloSchedules");
const Notification = require("../models/Notifications");
const uniqid = require("uniqid");
const cron = require("node-cron");
const moment = require("moment");

// schedule

const createSchedule = async (req, res) => {
  const { day, timing, studentType } = req.body;

  const scheduleExists = await Schedule.exists({
    $and: [{ studentType: "Solo" }, { day: day }, { timing: timing }],
  });

  const isVideoExistsPerm = await Schedule.exists({
    $and: [{ isVideoOn: true }, { day: day }, { timing: timing }],
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
  } else {
    try {
      const schedules = await new Schedule({
        ...req.body,
        scheduleId: uniqid(),
      }).save();
      res.status(200).json({
        data: schedules,
        message: "A new schedule has been added to the database.",
      });
    } catch (error) {
      res.status(400).json({
        message: "Error adding schedule to database.",
      });
    }
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
  try {
    const currentDay = new Date().toLocaleString("en-us", { weekday: "long" });
    await updateSchedulesForDay(currentDay);
  } catch (error) {
    console.error("Error updating schedules:", error);
  }
};

const updateSchedulesForDay = async (day) => {
  try {
    await Schedule.updateMany({ day }, { isVideoOn: false });
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
  try {
    const currentDay = new Date().toLocaleString("en-us", { weekday: "long" });
    await updateSchedulesIsActiveDef(currentDay);
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
  try {
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.json(schedule);
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

    await Notification.create({
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
  try {
    const deletedSched = await Schedule.findByIdAndDelete(req.params.id);

    if (!deletedSched) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: "Error deleting schedule" });
  }
};

const deleteManySchedule = async (req, res) => {
  try {
    const { schedules } = req.body;
    const userData = req.user;

    await Schedule.deleteMany({ _id: { $in: schedules } });

    await Notification.create({
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

const createTempSchedule = async (req, res) => {
  const { day, timing, dateTime } = req.body;

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
  try {
    const deletedTempSched = await TempSchedule.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTempSched) {
      return res
        .status(404)
        .json({ message: "Sorry, we can't find your schedule." });
    }
    res.status(200).json({
      message: "Your schedule has been deleted successfully",
      success: true,
    });
  } catch (err) {
    res.status(400).json({ message: "Error deleting your schedule" });
  }
};

const deleteTempSchedules = async (req, res) => {
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

    const studentBehindByCounterUpdate = schedules.map((schedule) => {
      return Student.updateOne(
        { _id: schedule?.studentId },
        {
          $inc: {
            behindByCounter:
              schedule.isActive === "Absent" ||
              schedule.isActive === "No information"
                ? 0
                : schedule.isActive <= 0
                ? 0
                : -1,
          },
        }
      );
    });

    await Promise.all(
      tempScheduleAttendanceStatusReset,
      studentBehindByCounterUpdate
    );

    await TempSchedule.deleteMany({
      dateTime: { $lt: currentDate },
    });

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

    await Notification.create({
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

// // temporary solo schedule

const createTempSoloSchedule = async (req, res) => {
  const { day, timing, dateTime } = req.body;

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
  try {
    const deletedTempSched = await TempSolo.findByIdAndDelete(req.params.id);
    if (!deletedTempSched) {
      return res
        .status(404)
        .json({ message: "Sorry, schedule does not exist." });
    }
    res.json({
      message:
        "You have been successfully deleted selected temporary solo schedule.",
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error deleting temporary solo schedule." });
  }
};

const deleteTempSoloSchedules = async (req, res) => {
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
                : schedule.isActive <= 0
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

    await Notification.create({
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

// const setVideo = async (req, res) => {
//   try {
//     const { isVideoOn } = req.body;
//     await Schedule.findByIdAndUpdate(req.params.id, { isVideoOn });
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

  // setActive,
  // setActiveTemp,
  // setActiveTempSolo,
  // setVideo,
  // setVideoTempSolo,
  // setWaitlistStatus,

  isVideoOffHandler,
  isActiveDefHandler,

  // setPlusAbsentCounter,
  // setMinusAbsentCounter,
};
