const Logs = require("../../models/order");
const LogsPresent = require("../../models/logsPresent");
const TempLogs = require("../../models/tempLogs");
const TempSoloLogs = require("../../models/tempSoloLogs");

const getLogs = async (req, res) => {
  try {
    const logs = await Logs.find()
      .populate("schedules.schedule")
      .populate("orderdBy", "fullname mail")
      .exec();
    res.json(logs);
  } catch (error) {
    console.error(error); // Log the actual error for better understanding
    return res.status(500).send("An error occurred, please try again!");
  }
};

const getLogsPresent = async (req, res) => {
  try {
    const logs = await LogsPresent.find();
    res.json(logs);
  } catch (error) {
    return res.status(500).send("error occured, please try again!");
  }
};

const getTempLogs = async (req, res) => {
  try {
    const logs = await TempLogs.find();
    res.json(logs);
  } catch (error) {
    return res.status(500).send("error occured, please try again!");
  }
};

const getTempSoloLogs = async (req, res) => {
  try {
    const logs = await TempSoloLogs.find();
    res.json(logs);
  } catch (error) {
    return res.status(500).send("error occured, please try again!");
  }
};

module.exports = { getLogs, getLogsPresent, getTempLogs, getTempSoloLogs };
