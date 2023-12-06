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
  },
  { timestamps: true }
);

schedsSchema.index({ nameOfStudent: 1, day: 1, timing: 1 }, { unique: true });
module.exports = mongoose.model("scheds", schedsSchema);
