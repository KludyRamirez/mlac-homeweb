const User = require("../../models/Users");
const bcrypt = require("bcryptjs");
const History = require("../../models/History");

const register = async (req, res) => {
  const userData = req.user;

  try {
    const { userName, firstName, surName, password, email, contactNo, role } =
      req.body;

    const userNameExists = await User.exists({
      userName: userName,
    });

    if (userNameExists) {
      return res
        .status(409)
        .json({ message: "Sorry, username exists. Please try again." });
    }

    const emailExists = await User.exists({
      email: email,
    });

    if (emailExists) {
      return res
        .status(409)
        .json({ message: "Sorry, email exists. Please try again." });
    }

    const latestUser = await User.findOne({}).sort({ uid: -1 }).limit(1);

    let newUid = 1;

    if (latestUser && !isNaN(parseInt(latestUser.uid))) {
      newUid = parseInt(latestUser.uid) + 1;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      uid: newUid,
      userName,
      firstName,
      surName,
      password: encryptedPassword,
      email,
      contactNo,
      role,
    });

    await History.create({
      userId: userData._id,
      typeOfNotif: "Authentication",
      actionOfNotif: "Add",
      message: `${user.userName} account has been created successfully.`,
      createdAt: new Date(),
    });

    res.status(200).json({
      userDetails: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
      message: `${user.userName} account has been created successfully.`,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again" });
  }
};

module.exports = { register };
