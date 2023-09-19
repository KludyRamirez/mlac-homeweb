const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const scheduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    schedType: {
      type: String,
      enum: ["Permanent", "Temporary"],
      required: true,
    },
    studentType: {
      type: String,
      enum: ["Solo", "Dyad"],
      required: true,
    },
    permanentSched: {
      type: ObjectId,
      ref: "Product",
    },
    dateTime: {
      type: String,
    },
    parent: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
    timings: {
      type: String,
      required: true,
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
      required: true,
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
      required: true,
    },
  },
  { timestamps: true }
);
scheduleSchema.index({ day: 1, timings: 1, isActive: true }, { unique: true });

module.exports = mongoose.model("schedule", scheduleSchema);
