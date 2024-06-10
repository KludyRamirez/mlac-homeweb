const mongoose = require("mongoose");

const pastSchedulesSchema = new mongoose.Schema(
  {
    scheduleId: {
      type: String,
      trim: true,
    },

    nameOfStudent: {
      type: String,
      trim: true,
    },

    isActive: {
      type: String,
      default: "No information yet",
      enum: ["No information yet", "Present", "Absent"],
    },

    isVideoOn: {
      type: Boolean,
      default: false,
    },

    schedType: {
      type: String,
      default: "Permanent",
    },

    studentType: {
      type: String,
      enum: ["Solo", "Dyad"],
    },

    parent: {
      type: String,
      trim: true,
    },

    timing: {
      type: String,
      enum: [
        "8:00 AM - 9:00 AM",
        "9:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM",
        "11:00 AM - 12:00 NN",
        "12:00 NN - 1:00 PM",
        "1:00 PM - 2:00 PM",
        "2:00 PM - 3:00 PM",
        "3:00 PM - 4:00 PM",
        "4:00 PM - 5:00 PM",
      ],
    },

    day: {
      type: String,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },

    date: {
      type: Date,
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

    isWaitlisted: {
      type: String,
      enum: ["Yes", "No"],
    },

    absencesCounter: {
      type: Number,
      default: 0,
    },

    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

pastSchedulesSchema.index(
  { nameOfStudent: 1, day: 1, timing: 1 },
  { unique: true }
);
module.exports = mongoose.model("PastSchedules", pastSchedulesSchema);
