const jwt = require("jsonwebtoken");
const User = require("../models/user");

const config = process.env;

const verifyToken = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    token = token.replace(/^Bearer\s+/, "");
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid token");
  }

  return next();
};

const adminCheck = async (req, res, next) => {
  const { username } = req.user;

  try {
    const adminUser = await User.findOne({
      username: username,
    }).exec();

    if (!adminUser) {
      return res.status(403).json({
        err: "Admin resource. Access denied.",
      });
    }

    if (adminUser.role !== "Administrator") {
      return res.status(403).json({
        err: "Admin resource. Access denied.",
      });
    }
    next();
  } catch (error) {
    console.error("Error in adminCheck middleware:", error);
    return res.status(500).json({
      err: "Internal server error.",
    });
  }
};

module.exports = { verifyToken, adminCheck };
