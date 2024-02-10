const Holiday = require("../../models/holiday");
const Schedule = require("../../models/scheds");

const createHoliday = async (req, res) => {
  try {
    const holiday = await new Holiday({
      ...req.body,
    }).save();
    res.json(holiday);
  } catch (error) {
    return res.status(400).send("Error creating holiday");
  }
};

const getHoliday = async (req, res) => {
  try {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.toLocaleDateString("en-US", {
      weekday: "long",
    });

    // Query MongoDB for matching schedules
    const matchingSchedules = await Schedule.find({ day: currentDayOfWeek });

    // Query MongoDB for matching holidays
    const matchingHolidays = await Holiday.find({
      date: currentDate.toISOString(),
    });

    if (matchingHolidays.length > 0) {
      // Update isActive attribute to false for matching schedules
      for (const schedule of matchingSchedules) {
        await Schedule.findByIdAndUpdate(schedule._id, { isActive: false });
      }

      return res
        .status(200)
        .json({ message: "Schedules updated successfully." });
    } else {
      return res.status(200).json({ message: "No matching holidays found." });
    }
  } catch (error) {
    console.error("Error updating schedules:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createHoliday, getHoliday };
