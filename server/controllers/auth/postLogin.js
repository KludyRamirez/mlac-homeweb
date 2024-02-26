const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    console.log(user);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          userId: user._id,
          username,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );

      return res.status(200).json({
        userDetails: {
          _id: user._id,
          token: token,
          role: user.role,
        },
      });
    }
    return res.status(400).send("Invalid credentials. Please try again");
  } catch (err) {
    return res.status(500).send("Something went wrong. Please try again");
  }
};

const getRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  try {
    if (!cookies?.jwt) return res.status(404).send("Error");

    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken });

    if (!user) {
      return res.status(404).send("Unknown user!");
    }

    jwt.verify(refreshToken, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err || !decoded || user.username !== decoded.username) {
        return res.status(404).send("Error");
      }

      const token = jwt.sign(
        {
          userId: user._id,
          username: user.username,
        },
        process.env.TOKEN_SIGNING_KEY, // Use a different key for signing
        { expiresIn: "1d" }
      );

      res.status(200).json({
        userDetails: {
          _id: user._id,
          username: user.username,
          token: token,
        },
      });
    });
  } catch (err) {
    res.status(404).send("Error");
  }
};

module.exports = { postLogin, getRefreshToken };
