const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    cardId: { type: String, unique: true },
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String },
    password: { type: String },
    role: {
      type: String,
      default: "Parent",
      enum: ["Parent", "Therapist", "Administrator"],
    },
    address: {
      type: String,
      trim: true,
    },
    container: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
