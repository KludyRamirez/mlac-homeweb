const User = require("../../models/user");
const bcrypt = require("bcryptjs");

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
  const { username, lastname, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update email if provided
    if (username) {
      user.username = username;
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

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { editUser, updateUserGet };
