const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const tempSchedulesSchema = new mongoose.Schema(
  {
    // independent attribute

    student: {
      type: ObjectId,
      ref: "Schedules",
      unique: true,
    },

    // dependent to student

    studentName: {
      type: String,
      trim: true,
    },

    studentId: {
      type: ObjectId,
      ref: "Students",
      unique: true,
    },

    studentType: {
      type: String,
      enum: ["Solo", "Dyad"],
    },

    // also independent

    companion: {
      type: ObjectId,
      ref: "Schedules",
    },

    scheduleId: {
      type: String,
      trim: true,
    },

    schedType: {
      type: String,
      default: "Temporary",
    },

    dateTime: {
      type: Date,
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
      trim: true,
    },

    day: {
      type: String,
      trim: true,
    },

    isVideoOn: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: String,
      default: "No information yet",
      enum: ["No information yet", "Present", "Absent"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TempSchedules", tempSchedulesSchema);
