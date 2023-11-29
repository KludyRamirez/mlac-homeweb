const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitation");
const friendsUpdate = require("../../socketHandlers/updates/friends");

const postInvite = async (req, res) => {
  const { targetUsername } = req.body;
  const { userId, username } = req.user;

  // cannot be friend yourself

  if (username.toLowerCase() === targetUsername.toLowerCase()) {
    return res
      .status(409)
      .send("Sorry. You cannot become friend with yourself");
  }

  const targetUser = await User.findOne({
    username: targetUsername.toLowerCase(),
  });

  if (!targetUser) {
    return res
      .status(404)
      .send(`Friend of ${targetUsername} has not been found`);
  }

  //check if invitation has already been sent
  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });

  if (invitationAlreadyReceived) {
    return res.status(409).send("Invitation has been already sent");
  }

  // check if the user whic we would like invite is already friend

  const usersAlreadyFriends = targetUser.friends.find(
    (friendId) => friendId.toString() === userId.toString()
  );

  if (usersAlreadyFriends) {
    return res.status(409).send("Already Friends!");
  }

  //create new invitation in database

  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  // if invitation has been successfully sent we would like to update friends invitation if other user is online

  // send pending invitations update to specific user
  friendsUpdate.updateFriendsPendingInvitations(targetUser._id.toString());

  return res.status(201).send("Invitation has been sent");
};

module.exports = { postInvite };
