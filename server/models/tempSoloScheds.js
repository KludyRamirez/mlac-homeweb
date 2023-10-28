const mongoose = require("mongoose");

const tempSoloSchedsSchema = new mongoose.Schema(
  {
    tempStudentName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "scheds",
      unique: true,
    },
    schedType: {
      type: String,
      enum: ["Permanent", "Temporary"],
    },
    dateTime: {
      type: String,
    },
    tempSoloDay: {
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

tempSoloSchedsSchema.index({ tempSoloDay: 1, timing: 1 }, { unique: true });
module.exports = mongoose.model("tempsoloscheds", tempSoloSchedsSchema);
