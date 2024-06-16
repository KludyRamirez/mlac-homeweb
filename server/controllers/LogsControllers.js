const Log = require("../models/Logs");
const Schedule = require("../models/Schedules");
const Notification = require("../models/Notifications");
const Student = require("../models/Students");
const cron = require("node-cron");
const mongoose = require("mongoose");

const createLogs = async (req, res) => {
  try {
    const { student, scheduleId, attendance } = req.body;

    const userData = req.user;

    const scheduleFindPromise = Schedule.findOneAndUpdate(
      { scheduleId: scheduleId },
      {
        isActive: attendance === "Absent" ? "Absent" : "Present",
      }
    );

    const studentUpdatePromise = Student.findByIdAndUpdate(student._id, {
      $inc: {
        behindByCounter: attendance === "Absent" ? 1 : -1,
      },
    });

    const logCreatePromise = Log.create({
      ...req.body,
      _id: new mongoose.Types.ObjectId(),
    });

    const notificationCreatePromise = Notification.create({
      userId: userData._id,
      typeOfNotif: "Logs",
      actionOfNotif: "Add",
      message: `Logs has been added successfully.`,
    });

    await Promise.all([
      scheduleFindPromise,
      studentUpdatePromise,
      logCreatePromise,
      notificationCreatePromise,
    ]);

    res.status(200).json({
      message: "Logs has been added successfully.",
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

    const todayDay = today.toLocaleString("en-us", { weekday: "long" });

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
      const logsPromises = schedules.map((schedule) => {
        const logData = {
          ...schedule.toObject(),
          _id: new mongoose.Types.ObjectId(),
          date: today,
        };

        const log = new Log(logData);
        return log.save();
      });

      await Promise.all(logsPromises);

      const ids = schedules.map((schedule) => schedule._id);
      await Schedule.updateMany(
        { _id: { $in: ids } },
        {
          $set: { isActive: "Absent" },
          $inc: { absentCounter: 1 },
        }
      );
    }
  } catch (error) {
    throw new Error(`Failed to update schedules for ${day}: ${error.message}`);
  }
};

const isActiveAbsentHandler = () => {
  cron.schedule("00 00 * * *", updateSchedulesIsActiveToAbsent);
};

isActiveAbsentHandler();

module.exports = {
  createLogs,
};
