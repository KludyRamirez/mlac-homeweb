const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const scheduleSchema = new mongoose.Schema(
  {
    nameOfStudent: {
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
      enum: [
        "7 AM to 8 AM",
        "8 AM to 9 AM",
        "9 AM to 10 AM",
        "10 AM to 11 AM",
        "11 AM to 12 NN",
        "12 NN to 1 PM",
        "1 PM to 2 PM",
        "2 PM to 3 PM",
        "3 PM to 4 PM",
        "4 PM to 5 PM",
      ],
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
