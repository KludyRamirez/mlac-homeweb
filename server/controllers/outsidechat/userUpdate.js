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
  const { username, firstname, lastname, password, role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (role) {
      user.role = role;
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
    if (password && password !== user.password) {
      // Check if the new password is different from the existing one
      const hashedPassword = await bcrypt.hash(password, 10);
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
