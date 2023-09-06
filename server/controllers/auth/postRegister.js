const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uniqid = require("uniqid");

const postRegister = async (req, res) => {
  try {
    console.log("register came");
    const { username, lastname, password, role, cardId } = req.body;
    // check if user exists - kluds - 1st comment
    const userExists = await User.exists({
      lastname: lastname.toLowerCase(),
    });

    if (userExists) {
      return res.status(409).send("Account already in use");
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user document and save in database
    const user = await User.create({
      username,
      lastname,
      password: encryptedPassword,
      role,
      cardId: uniqid(),
    });

    // create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
      userDetails: {
        token: token,
        username: user.username,
      },
    });
  } catch (err) {
    return res.status(500).send("Error occured. Please try again");
  }
};

module.exports = postRegister;
