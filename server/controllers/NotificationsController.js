const User = require("../models/Users");

const getUserNotifications = async (req, res) => {
  try {
    const userData = req.user;

    const user = await User.findOne({ _id: userData._id }).populate({
      path: "notifications",
      model: "Notifications",
      populate: {
        path: "sender",
        model: "Users",
        select: "firstName surName",
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const notifications = user.notifications;

    res.status(200).json({
      notifications,
      message:
        "Successfully retrieved notifications for the current logged in user.",
    });
  } catch (error) {
    console.error("Error retrieving notifications:", error);
    return res.status(500).send("An error occurred, please try again!");
  }
};

module.exports = {
  getUserNotifications,
};
