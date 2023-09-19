const express = require("express");
const router = express.Router();
const userUpdateController = require("../controllers/outsidechat/userUpdateController");

const { verifyToken, adminCheck } = require("../middleware/auth");

const auth = verifyToken;
const admin = adminCheck;

router.get(
  "/user/:id",
  auth,
  admin,
  userUpdateController.controllers.updateUserGet
);
router.put("/user/:id", userUpdateController.controllers.editUser);

// test route to verify middleware if working

router.get("/test", auth, (req, res) => {
  res.send("request passed");
});

module.exports = router;
