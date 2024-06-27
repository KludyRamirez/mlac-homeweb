const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "Users",
    },

    typeOfNotif: {
      type: String,
    },

    actionOfNotif: {
      type: String,
    },

    message: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);
