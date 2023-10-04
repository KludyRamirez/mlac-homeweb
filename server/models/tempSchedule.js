const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const tempScheduleSchema = new mongoose.Schema(
  {
    nameOfStudent: {
      type: ObjectId,
      ref: "schedule",
    },
    schedType: {
      type: String,
      enum: ["Permanent", "Temporary"],
    },
    studentType: {
      type: String,
      enum: ["Solo", "Dyad"],
    },
    permanentSched: {
      type: ObjectId,
      ref: "schedule",
    },
    dateTime: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tempSchedule", tempScheduleSchema);

tempScheduleSchema.index(
  { day: 1, timing: 1, isActive: true },
  { unique: true }
);
