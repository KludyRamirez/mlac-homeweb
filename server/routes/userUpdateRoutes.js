const express = require("express");
const router = express.Router();
const userUpdateController = require("../controllers/outsidechat/userUpdateController");

const auth = require("../middleware/auth");

router.put("/user/:id", userUpdateController.controllers.editUser);

// test route to verify middleware if working

router.get("/test", auth, (req, res) => {
  res.send("request passed");
});

module.exports = router;
