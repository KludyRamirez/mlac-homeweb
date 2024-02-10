const mongoose = require("mongoose");

const holidaySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
    },
    localname: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("holiday", holidaySchema);
