const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const containerSchema = new mongoose.Schema(
  {
    schedules: [
      {
        schedule: {
          type: ObjectId,
          ref: "schedule",
        },
        absentReason: String,
      },
    ],
    orderdBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("container", containerSchema);
