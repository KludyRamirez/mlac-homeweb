const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const studentsSchema = new mongoose.Schema(
  {
    studentNo: { type: String },
    firstName: { type: String },
    surName: { type: String },
    middleName: { type: String },
    sex: { type: String },
    parent: {
      type: ObjectId,
      ref: "Users",
    },
    studentType: {
      type: String,
      enum: ["Solo", "Dyad"],
    },
    statusOfStudent: {
      type: String,
      default: "Enrolled",
      enum: ["Enrolled", "Dismissed"],
    },
    behindByCounter: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Students", studentsSchema);
