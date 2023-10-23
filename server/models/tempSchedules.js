const mongoose = require("mongoose");

const tempScheduleSchema = new mongoose.Schema(
  {
    tempStudentName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "scheds",
      unique: true,
    },
    schedType: {
      type: String,
      enum: ["Permanent", "Temporary"],
    },
    permanentSched: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "scheds",
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
