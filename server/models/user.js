const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    cardId: { type: String, unique: true },
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String },
    password: { type: String, default: "mlac123" },
    fullname: { type: String },
    mail: { type: String },
    phone: {
      type: String,
    },
    role: {
      type: String,
      default: "Parent",
      enum: ["Parent", "Therapist", "Administrator"],
    },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Disabled"],
    },
    address: {
      type: String,
      trim: true,
    },
    contact: {
      type: String,
      trim: true,
    },
    container: {
      type: Array,
      default: [],
    },

    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    videoChat: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
