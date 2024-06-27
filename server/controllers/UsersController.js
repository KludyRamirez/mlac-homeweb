const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const History = require("../models/History");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    return res.status(500).send("An error occurred, please try again!");
  }
};

const editUser = async (req, res) => {
  try {
    const { userName, firstName, surName, password, role, contactNo, email } =
      req.body;

    const userData = req.user;

    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id);

    if (!user) {
      return res.status(404).json({ message: "Cannot find selected user." });
    }

    if (role) user.role = role;
    if (userName) user.userName = userName;
    if (firstName) user.firstName = firstName;
    if (surName) user.surName = surName;
    if (role) user.role = role;
    if (contactNo) user.contactNo = contactNo;
    if (email) user.email = email;

    if (password && password !== user.password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    const tokenPayload = {
      _id: user._id,
      userName: user.userName,
      email: user.email,
      role: user.role,
    };

    const secretKey = process.env.ACCESS_TOKEN;
    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "24h" });

    await History.create({
      userId: userData._id,
      typeOfNotif: "Users",
      actionOfNotif: "Update",
      message: `User ${user.userName} has been updated successfully.`,
      createdAt: new Date(),
    });

    res.status(200).json({
      userDetails: {
        _id: user._id,
        token: token,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
      message: `User ${user.userName} has been updated successfully.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteOneUser = async (req, res) => {
  try {
    const userData = req.user;

    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "Cannot find selected user." });
    }

    await History.create({
      userId: userData._id,
      typeOfNotif: "Users",
      actionOfNotif: "Delete",
      message: `User ${deletedUser.userName} has been deleted successfully.`,
      createdAt: new Date(),
    });

    res.status(200).json({
      message: `User ${deletedUser.userName} has been deleted successfully.`,
    });
  } catch (err) {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(400).json({
      message: `User ${deletedUser.userName} was not deleted.`,
    });
  }
};

const deleteManyUser = async (req, res) => {
  try {
    const { users } = req.body;

    const userData = req.user;

    if (!users) {
      return res.status(404).json({ error: "Cannot find selected users." });
    }

    await User.deleteMany({ _id: { $in: users } });

    await History.create({
      userId: userData._id,
      typeOfNotif: "Users",
      actionOfNotif: "Delete",
      message: `Selected users has been deleted successfully.`,
      createdAt: new Date(),
    });
    res
      .status(200)
      .json({ message: "Selected users has been deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  editUser,
  deleteOneUser,
  deleteManyUser,
};
