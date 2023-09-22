const Schedule = require("../../models/schedule");

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

module.exports = { createSchedule };
