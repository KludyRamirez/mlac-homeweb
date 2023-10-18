const Schedule = require("../../models/scheds");
const TempSchedule = require("../../models/tempSchedules");
const moment = require("moment");

const createSchedule = async (req, res) => {
  try {
    const newSchedule = await new Schedule({
      ...req.body,
    }).save();
    res.json(newSchedule);
  } catch (error) {
    return res.status(400).send("Schedule exists.");
  }
};

const createTempSoloSchedule = async (req, res) => {
  try {
    const formattedDateTime = moment(req.body.dateTime).format("MMMM Do YYYY");
    const newSchedule = await new Schedule({
      ...req.body,
      dateTime: formattedDateTime,
    }).save();
    res.json(newSchedule);
  } catch (err) {
    console.log(err);
    res.status(400).json("Temporary schedule create error.");
  }
};

const getSchedule = async (req, res) => {
  try {
    const scheds = await Schedule.find()
      .populate("parent", "firstname lastname")
      .populate("permanentSched", "day timing parent nameOfStudent")
      .populate("tempStudentName", "parent nameOfStudent studentType schedType")
      .exec();
    res.json(scheds);
  } catch (error) {
    return res.status(500).send("Error occured. Please try again");
  }
};

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
      return res.status(404).json("Schedule not found.");
    }
    res.json(schedule);
  } catch (error) {
    return res.status(400).send("Schedule update error!");
  }
};

const deleteOneSchedule = async (req, res) => {
  try {
    const deletedSched = await Schedule.findByIdAndDelete(req.params.id);
    if (!deletedSched) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(400).json("Deletion failed.");
  }
};

const deleteOneTempSchedule = async (req, res) => {
  try {
    const deletedTempSched = await TempSchedule.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTempSched) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(400).json("Deletion failed.");
  }
};

const createTempSchedule = async (req, res) => {
  try {
    const formattedDateTime = moment(req.body.dateTime).format("MMMM Do YYYY");
    const newSchedule = await new TempSchedule({
      ...req.body,
      dateTime: formattedDateTime,
    }).save();
    res.json(newSchedule);
  } catch (err) {
    console.log(err);
    res.status(400).json("Temporary schedule create error.");
  }
};

const getTempSchedule = async (req, res) => {
  try {
    const tempScheds = await TempSchedule.find()
      .populate("permanentSched", "day timing parent nameOfStudent")
      .populate("tempStudentName", "parent nameOfStudent studentType schedType")
      .exec();

    res.json(tempScheds);
  } catch (error) {
    return res.status(500).send("Error occured. Please try again");
  }
};

const deleteTempSchedules = async (req, res) => {
  try {
    const currentDate = new Date();
    const formattedDate = moment(currentDate)
      .add(1, "days")
      .format("MMMM Do YYYY");

    const schedulesToDelete = await TempSchedule.find({
      dateTime: { $eq: formattedDate },
    }).select("tempStudentName");

    console.log("Schedules to be deleted:", schedulesToDelete);

    const deleteResult = await TempSchedule.deleteMany({
      dateTime: { $eq: formattedDate },
    });

    console.log("Schedules to be deleted:", deleteResult);

    await Schedule.updateMany(
      {
        _id: {
          $in: schedulesToDelete.map((schedule) => schedule.tempStudentName),
        },
      },
      { $set: { isActive: true } }
    );

    res.status(200).json("Expired schedules deleted.");
  } catch (error) {
    res.status(500).json("Error deleting expired schedules.");
  }
};

const deleteTempSoloSchedules = async (req, res) => {
  try {
    const currentDate = new Date();
    const formattedDate = moment(currentDate)
      .add(1, "days")
      .format("MMMM Do YYYY");

    const schedulesToDelete = await Schedule.find({
      dateTime: { $eq: formattedDate },
    }).select("tempStudentName");

    console.log("Schedules to be deleted:", schedulesToDelete);

    const deleteResult = await Schedule.deleteMany({
      dateTime: { $eq: formattedDate },
    });

    console.log("Schedules to be deleted:", deleteResult);

    await Schedule.updateMany(
      {
        _id: {
          $in: schedulesToDelete.map((schedule) => schedule.tempStudentName),
        },
      },
      { $set: { isActive: true } }
    );

    res.status(200).json("Expired schedules deleted.");
  } catch (error) {
    res.status(500).json("Error deleting expired schedules.");
  }
};

const setActive = async (req, res) => {
  try {
    const { isActive } = req.body;
    await Schedule.findByIdAndUpdate(req.params.id, { isActive });
    res.status(200).json({ message: "Active status changed." });
  } catch (error) {
    res.status(500).json({ error: "Failed to change active status." });
  }
};

module.exports = {
  createSchedule,
  createTempSoloSchedule,
  getSchedule,
  getOneSchedule,
  updateOneSchedule,
  deleteOneSchedule,
  deleteOneTempSchedule,
  createTempSchedule,
  getTempSchedule,
  deleteTempSchedules,
  deleteTempSoloSchedules,
  setActive,
};
