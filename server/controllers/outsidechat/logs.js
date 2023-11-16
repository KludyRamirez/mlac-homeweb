const Logs = require("../../models/order");

const getLogs = async (req, res) => {
  try {
    const logs = await Logs.find();
    res.json(logs);
  } catch (error) {
    return res.status(500).send("error occured, please try again!");
  }
};

module.exports = { getLogs };
