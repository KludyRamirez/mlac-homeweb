const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const notificationsSchema = new mongoose.Schema(
  {
    sender: {
      type: ObjectId,
      ref: "Users",
    },

    type: {
      type: String,
    },

    message: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notifications", notificationsSchema);
