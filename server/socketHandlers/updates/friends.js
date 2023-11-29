const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitation");
const serverStore = require("../../serverStore");

const updateFriendsPendingInvitations = async (userId) => {
  try {
    const receiverList = serverStore.getActiveConnections(userId);

    if (receiverList.length > 0) {
      const pendingInvitations = await FriendInvitation.find({
        receiverId: userId,
      }).populate("senderId", "_id username");

      // find if user of specified userId has active connections

      const io = serverStore.getSocketServerInstance();

      receiverList.forEach((receiverSocketId) => {
        io.to(receiverSocketId).emit("friends-invitations", {
          pendingInvitations: pendingInvitations ? pendingInvitations : [],
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const updateFriends = async (userId) => {
  try {
    const receiverList = serverStore.getActiveConnections(userId);

    if (receiverList.length > 0) {
      const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
        "friends",
        "_id username"
      );

      if (user) {
        const friendsList = user.friends.map((f) => {
          return {
            id: f._id,
            username: f.username,
          };
        });

        const io = serverStore.getSocketServerInstance();

        receiverList.forEach((receiverSocketId) => {
          io.to(receiverSocketId).emit("friends-list", {
            friends: friendsList ? friendsList : [],
          });
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  updateFriendsPendingInvitations,
  updateFriends,
};
