const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.send("register route working");
});

router.post("/login", (req, res) => {
  res.send("login route working");
});

module.exports = router;
