const express = require("express");
const router = express.Router();
const userController = require("../controllers/outsidechat/userControllers");

const auth = require("../middleware/auth");

router.get("/user", userController.controllers.getUser);

router.delete("/user/:id", userController.controllers.deleteUser);

// test route to verify middleware if working

router.get("/test", auth, (req, res) => {
  res.send("request passed");
});

module.exports = router;
