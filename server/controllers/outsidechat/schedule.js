const Schedule = require("../../models/scheds");
const TempSchedule = require("../../models/tempSchedules");
const TempSolo = require("../../models/tempSoloScheds");
const moment = require("moment");

// schedule

const createSchedule = async (req, res) => {
  try {
    const newSchedule = await new Schedule({
      ...req.body,
    }).save();
    res.json(newSchedule);
  } catch (error) {
    return res.status(400).send("schedule exists!");
  }
};

const getSchedule = async (req, res) => {
  try {
    const scheds = await Schedule.find();
    res.json(scheds);
  } catch (error) {
    return res.status(500).send("error occured, please try again!");
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
      return res.status(404).json("Schedule not found!");
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

// temporary schedule

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

// temporary solo schedule

const createTempSoloSchedule = async (req, res) => {
  try {
    const formattedDateTime = moment(req.body.dateTime).format("MMMM Do YYYY");
    const newSchedule = await new TempSolo({
      ...req.body,
      dateTime: formattedDateTime,
    }).save();
    res.json(newSchedule);
  } catch (err) {
    console.log(err);
    res.status(400).json("Temporary schedule create error.");
  }
};

const getTempSoloSchedule = async (req, res) => {
  try {
    const tempScheds = await TempSolo.find()
      .populate("permanentSched", "day timing parent nameOfStudent")
      .populate("tempStudentName", "parent nameOfStudent studentType schedType")
      .exec();

    res.json(tempScheds);
  } catch (error) {
    return res.status(500).send("Error occured. Please try again");
  }
};

const deleteOneTempSoloSchedule = async (req, res) => {
  try {
    const deletedTempSched = await TempSolo.findByIdAndDelete(req.params.id);
    if (!deletedTempSched) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(400).json("Deletion failed.");
  }
};

const deleteTempSoloSchedules = async (req, res) => {
  try {
    const currentDate = new Date();
    const formattedDate = moment(currentDate)
      .add(1, "days")
      .format("MMMM Do YYYY");

    const schedulesToDelete = await TempSolo.find({
      dateTime: { $eq: formattedDate },
    }).select("tempStudentName");

    console.log("Schedules to be deleted:", schedulesToDelete);

    const deleteResult = await TempSolo.deleteMany({
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

// setting isActive state

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
  getSchedule,
  getOneSchedule,
  updateOneSchedule,
  deleteOneSchedule,

  createTempSchedule,
  getTempSchedule,
  deleteOneTempSchedule,
  deleteTempSchedules,

  createTempSoloSchedule,
  getTempSoloSchedule,
  deleteOneTempSoloSchedule,
  deleteTempSoloSchedules,

  setActive,
};
