const mongoose = require("mongoose");

const tempScheduleSchema = new mongoose.Schema(
  {
    tempStudentName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mixedschedules",
      unique: true,
    },
    schedType: {
      type: String,
      enum: ["Permanent", "Temporary"],
    },
    permanentSched: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mixedschedules",
    },
    dateTime: {
      type: String,
    },
    tempSoloDay: {
      type: String,
    },
  },
  { timestamps: true }
);

// tempScheduleSchema.index(
//   { tempStudentName: 1, tempSoloDay: 1, timing: 1 },
//   { unique: true }
// );
module.exports = mongoose.model("tempschedule", tempScheduleSchema);
