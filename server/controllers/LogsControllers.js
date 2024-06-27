const Log = require("../models/Logs");
const Schedule = require("../models/Schedules");
const TempSchedule = require("../models/TempSchedules");
const TempSolo = require("../models/TempSoloSchedules");
const History = require("../models/History");
const Student = require("../models/Students");
const cron = require("node-cron");
const mongoose = require("mongoose");

const createLogs = async (req, res) => {
  try {
    const { studentId, scheduleId, schedType, studentType, attendance } =
      req.body;

    const userData = req.user;

    if (schedType === "Permanent") {
      await Schedule.findOneAndUpdate(
        { scheduleId: scheduleId },
        {
          isActive: attendance === "Absent" ? "Absent" : "Present",
        }
      );
    } else if (schedType === "Temporary" && studentType === "Dyad") {
      await TempSchedule.findOneAndUpdate(
        { scheduleId: scheduleId },
        {
          isActive: attendance === "Absent" ? "Absent" : "Present",
        }
      );
    } else if (schedType === "Temporary" && studentType === "Solo") {
      await TempSolo.findOneAndUpdate(
        { scheduleId: scheduleId },
        {
          isActive: attendance === "Absent" ? "Absent" : "Present",
        }
      );
    }

    let incrementValue;

    if (attendance === "Absent") {
      incrementValue = 1;
    } else {
      incrementValue = 0;
    }

    const studentUpdatePromise = await Student.findByIdAndUpdate(
      studentId,
      {
        $inc: {
          behindByCounter: incrementValue,
        },
      },
      { new: true }
    );

    const logCreatePromise = Log.create({
      ...req.body,
      _id: new mongoose.Types.ObjectId(),
      isActive: attendance,
    });

    const notificationCreatePromise = History.create({
      userId: userData._id,
      typeOfNotif: "Logs",
      actionOfNotif: "Add",
      message: `${attendance} log has been added successfully.`,
    });

    await Promise.all([
      studentUpdatePromise,
      logCreatePromise,
      notificationCreatePromise,
    ]);

    res.status(200).json({
      message: `${attendance} log has been added successfully.`,
    });
  } catch (error) {
    console.error("Error creating logs or notification:", error);
    res.status(500).json({
      message: "An error occurred while adding logs.",
    });
  }
};

const updateSchedulesIsActiveToAbsent = async () => {
  try {
    const today = new Date();

    const todayDay = today.toLocaleString("en-US", { weekday: "long" });

    await updateSchedulesIsActiveToAbsentDef(todayDay, today);
  } catch (error) {
    console.error("Error updating schedules:", error);
  }
};

const updateSchedulesIsActiveToAbsentDef = async (day, today) => {
  try {
    const schedules = await Schedule.find({
      day: day,
      isActive: "No information yet",
    });

    if (schedules.length > 0) {
      // Create logs for each schedule
      const logData = schedules.map((schedule) => ({
        ...schedule.toObject(),
        _id: new mongoose.Types.ObjectId(),
        date: today,
      }));

      const logsPromises = logData.map((log) => new Log(log).save());
      await Promise.all(logsPromises);

      // bulkwriting updates - kludy - pag maramihan gusto mo mag update tas nsa ibang
      // model  yung gusto mo iupdate.
      // nested update

      const bulkUpdateOps = schedules.map((schedule) => ({
        updateOne: {
          filter: { _id: schedule._id },
          update: {
            $set: { isActive: "Absent" },
            $inc: { "studentId.behindByCounter": 1 },
          },
        },
      }));

      await Schedule.bulkWrite(bulkUpdateOps);
    }
  } catch (error) {
    throw new Error(`Failed to update schedules for ${day}: ${error.message}`);
  }
};

const isActiveAbsentHandler = () => {
  cron.schedule("00 00 * * *", updateSchedulesIsActiveToAbsent);
};

isActiveAbsentHandler();

const getLogs = async (req, res) => {
  try {
    const logs = await Log.find()
      .populate("studentId", "studentNo studentType parent")
      .exec();
    res.status(200).json({
      logs,
      message: "Successfully getting logs.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occurred, please try again." });
  }
};

const getOneLog = async (req, res) => {
  try {
    const logs = await Log.findById(req.params.id);

    if (!logs) {
      return res.status(404).json({ message: "Log not found." });
    }

    res.status(200).json({
      logs,
      message: "Successfully getting the log.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  createLogs,
  getLogs,
  getOneLog,
};
