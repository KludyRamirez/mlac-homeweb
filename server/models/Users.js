const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const usersSchema = new mongoose.Schema(
  {
    uid: { type: Number },
    userName: { type: String },
    firstName: { type: String },
    surName: { type: String },
    email: { type: String },
    password: { type: String },
    contactNo: { type: String },
    role: {
      type: String,
      enum: ["Student", "Parent", "Administrator"],
    },

    statusOfUser: {
      type: String,
      default: "Enabled",
      enum: ["Enabled", "Disabled"],
    },

    refreshToken: {
      type: String,
    },

    notifications: [
      {
        type: ObjectId,
        ref: "Notifications",
      },
    ],
  },
  { timestamps: true }
);

//Users

module.exports = mongoose.model("Users", usersSchema);
