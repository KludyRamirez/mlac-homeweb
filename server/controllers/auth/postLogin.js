const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    console.log(user);

    if (user && (await bcrypt.compare(password, user.password))) {
      // send new token
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
          cardId: user.cardId,
          role: user.role,
          fullname: user.fullname,
          username: user.username,
          mail: user.mail,
        },
      });
    }
    return res.status(400).send("Invalid credentials. Please try again");
  } catch (err) {
    return res.status(500).send("Something went wrong. Please try again");
  }
};

module.exports = postLogin;
