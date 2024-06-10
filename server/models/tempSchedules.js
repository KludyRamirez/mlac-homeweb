const mongoose = require("mongoose");

const tempSchedulesSchema = new mongoose.Schema(
  {
    scheduleId: {
      type: String,
      trim: true,
    },
    tempStudentName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedules",
      unique: true,
    },
    schedType: {
      type: String,
      default: "Temporary",
    },
    permanentSched: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedules",
    },
    dateTime: {
      type: Date,
    },
    timing: {
      type: String,
      enum: [
        "8 AM to 9 AM",
        "9 AM to 10 AM",
        "10 AM to 11 AM",
        "11 AM to 12 NN",
        "1 PM to 2 PM",
        "2 PM to 3 PM",
        "3 PM to 4 PM",
        "4 PM to 5 PM",
      ],
    },
    tempSoloDay: {
      type: String,
      trim: true,
    },

    studentType: {
      type: String,
      enum: ["Solo", "Dyad"],
    },

    isActive: {
      type: String,
      default: "No information yet",
      enum: ["No information yet", "Present", "Absent"],
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

module.exports = mongoose.model("TempSchedules", tempSchedulesSchema);
