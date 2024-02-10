const mongoose = require("mongoose");

const progressReportSchema = new mongoose.Schema(
  {
    cardId: {
      type: String,
    },
    nameOfStudent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "scheds",
      unique: true,
    },
    dateTime: {
      type: Date,
    },
    day: {
      type: String,
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Overdue", "Completed"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("progressreport", progressReportSchema);
