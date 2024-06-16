const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const schedulesSchema = new mongoose.Schema(
  {
    student: {
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
      type: Boolean,
      default: false,
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

schedulesSchema.index(
  { nameOfStudent: 1, day: 1, timing: 1 },
  { unique: true }
);
module.exports = mongoose.model("Schedules", schedulesSchema);
