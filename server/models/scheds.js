const mongoose = require("mongoose");

const schedsSchema = new mongoose.Schema(
  {
    cardId: {
      type: String,
    },
    nameOfStudent: {
      type: String,
      trim: true,
      maxlength: 32,
    },

    isActive: {
      type: String,
      default: "No info yet",
      enum: ["No info yet", "Present", "Absent"],
    },

    isVideoOn: {
      type: Boolean,
      default: false,
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

    isWaitlisted: {
      type: String,
      enum: ["Yes", "No"],
    },

    notifParentLocator: {
      type: String,
    },
    absentCounter: {
      type: Number,
      default: 0,
    },
    age: {
      type: String,
    },
    sex: {
      type: String,
      enum: ["Male", "Female"],
    },
    birthday: {
      type: String,
    },
    previousCenter: {
      type: String,
    },
    currentCenter: {
      type: String,
    },
    doctor: {
      type: String,
    },
    medicalHistory: {
      type: String,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    pic: {
      type: String,
    },
  },
  { timestamps: true }
);

schedsSchema.index({ nameOfStudent: 1, day: 1, timing: 1 }, { unique: true });
module.exports = mongoose.model("scheds", schedsSchema);
