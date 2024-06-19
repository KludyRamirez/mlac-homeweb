const mongoose = require("mongoose");

const tempSoloSchedulesSchema = new mongoose.Schema(
  {
    scheduleId: {
      type: String,
      trim: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedules",
      unique: true,
    },
    schedType: {
      type: String,
      enum: ["Permanent", "Temporary"],
    },
    dateTime: {
      type: Date,
    },
    day: {
      type: String,
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

    isActive: {
      type: String,
      default: "No information yet",
      enum: ["No information yet", "Present", "Absent"],
    },

    isVideoOn: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

tempSoloSchedulesSchema.index(
  { day: 1, timing: 1, isActive: 1 },
  { unique: true }
);
module.exports = mongoose.model("TempSoloSchedules", tempSoloSchedulesSchema);
