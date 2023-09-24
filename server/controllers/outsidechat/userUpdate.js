const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const updateUserGet = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const editUser = async (req, res) => {
  const { username, firstname, lastname, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) {
      user.username = username;
    }

    // Update email if provided
    if (firstname) {
      user.firstname = firstname;
    }

    // Update username if provided
    if (lastname) {
      user.lastname = lastname;
    }

    // Update password if provided
    if (password) {
      // Hash and salt the new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user.password = hashedPassword;
    }

    await user.save();

    const tokenPayload = { userId: user._id, username: user.username };
    const secretKey = process.env.TOKEN_KEY;
    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "24h" });

    return res.status(200).json({
      userDetails: {
        token: token,
        username: user.username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { editUser, updateUserGet };
