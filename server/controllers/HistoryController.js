const History = require("../models/History");

const getHistory = async (req, res) => {
  try {
    const notifications = await History.find()
      .populate("userId", "uid userName firstName surName")
      .sort({ createdAt: -1 })
      .exec();
    res.json(notifications);
  } catch (error) {
    return res.status(500).send("An error occurred, please try again!");
  }
};

module.exports = {
  getHistory,
};
