const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    cardId: { type: String, unique: true },
    lastname: { type: String, unique: true },
    username: { type: String },
    password: { type: String },
    role: {
      type: String,
      default: "parent",
      enum: ["parent", "therapist", "admin"],
    },
    address: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
