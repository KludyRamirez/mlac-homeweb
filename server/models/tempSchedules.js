const mongoose = require("mongoose");

const tempScheduleSchema = new mongoose.Schema(
  {
    tempStudentName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mixedschedules",
      unique: true,
    },
    schedType: {
      type: String,
      enum: ["Permanent", "Temporary"],
    },
    permanentSched: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mixedschedules",
    },
    dateTime: {
      type: String,
    },
    tempSoloDay: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tempschedule", tempScheduleSchema);
