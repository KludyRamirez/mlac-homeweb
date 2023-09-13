const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const scheduleSchema = new mongoose.Schema(
  {
    name: {
      type: ObjectId,
      ref: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    schedType: {
      type: String,
      enum: ["Permanent", "Temporary"],
    },
    studentType: {
      type: String,
      enum: ["Solo", "Dyad"],
    },
    parent: {
      type: ObjectId,
      ref: "user",
    },
    timings: {
      type: String,
    },
    day: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    absentReason: {
      type: String,
      default: "Busy",
      enum: [
        "Busy",
        "Sickness",
        "No Transportation",
        "Family Matter",
        "Tiredness",
        "Conflict of Schedule",
        "Bad Weather",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("schedule", scheduleSchema);
