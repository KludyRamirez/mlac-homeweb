const Schedule = require("../../models/schedule");
const moment = require("moment");

const createSchedule = async (req, res) => {
  try {
    const newSchedule = await new Schedule({
      ...req.body,
    }).save();
    res.json(newSchedule);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

const getSchedule = async (req, res) => {
  try {
    const scheds = await Schedule.find()
      .populate("parent", "firstname lastname")
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
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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
    res.status(400).json({ error: err.message });
  }
};

const createTempSchedule = async (req, res) => {
  try {
    const formattedDateTime = moment(req.body.dateTime).format(
      "MMMM Do YYYY, h:mm:ss a"
    );

    const newSchedule = await new Schedule({
      ...req.body,

      dateTime: formattedDateTime,
    }).save();
    res.json(newSchedule);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

const getTempSchedule = async (req, res) => {
  try {
    const scheds = await Schedule.find();

    res.json(scheds);
  } catch (error) {
    return res.status(500).send("Error occured. Please try again");
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
};
