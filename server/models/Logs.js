const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const logsSchema = new mongoose.Schema(
  {
    studentId: {
      type: ObjectId,
      ref: "Students",
    },

    // dependent attributes from student

    nameOfStudent: {
      type: String,
      trim: true,
    },

    parent: {
      type: String,
      trim: true,
    },

    studentType: {
      type: String,
      enum: ["Solo", "Dyad"],
    },

    // independent attributes

    scheduleId: {
      type: String,
      trim: true,
    },

    isActive: {
      type: String,
      default: "No information yet",
      enum: ["No information yet", "Present", "Absent"],
    },

    isVideoOn: {
      type: String,
      default: "Off",
      enum: ["Off", "On"],
    },

    schedType: {
      type: String,
      default: "Permanent",
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
      trim: true,
    },

    isWaitlisted: {
      type: String,
      default: "No",
      enum: ["Yes", "No"],
    },

    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Logs", logsSchema);
