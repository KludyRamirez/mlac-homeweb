const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uniqid = require("uniqid");

const postRegister = async (req, res) => {
  try {
    const { username, lastname, password, role, firstname, phone } = req.body;

    const usernameExists = await User.exists({
      username: username,
    });

    if (usernameExists) {
      return res.status(409).send("Username already exists");
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user document and save in database
    const user = await User.create({
      username,
      firstname,
      lastname,
      password: encryptedPassword,
      role,
      cardId: uniqid(),
      fullname: `${firstname} ${lastname}`,
      phone,
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
        _id: user._id,
        token: token,
        cardId: user.cardId,
        role: user.role,
        fullname: user.fullname,
        username: user.username,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error occurred. Please try again");
  }
};

const postWaitList = async (req, res) => {
  try {
    const { username, lastname, role, firstname, mail, phone } = req.body;

    const usernameExists = await User.exists({
      username: username,
    });

    if (usernameExists) {
      return res.status(409).send("Username already exists");
    }
    // create user document and save in database
    const user = await User.create({
      username,
      firstname,
      lastname,
      role,
      cardId: uniqid(),
      fullname: `${firstname} ${lastname}`,
      mail,
      phone,
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
        _id: user._id,
        token: token,
        cardId: user.cardId,
        role: user.role,
        fullname: user.fullname,
        username: user.username,
        mail: user.mail,
      },
    });
  } catch (err) {
    return res.status(500).send("Error occured. Please try again");
  }
};

module.exports = { postRegister, postWaitList };
