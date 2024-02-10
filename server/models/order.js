const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    schedules: [
      {
        schedule: {
          type: ObjectId,
          ref: "scheds",
        },
        absentReason: String,
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: "Stand By",
      enum: ["Stand By", "On-Going", "Completed"],
    },
    orderdBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
