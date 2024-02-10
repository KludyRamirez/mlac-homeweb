const express = require("express");
const router = express.Router();
const userUpdateController = require("../controllers/outsidechat/userUpdateController");

const { verifyToken, adminCheck } = require("../middleware/auth");

const auth = verifyToken;
const admin = adminCheck;

router.get(
  "/user/:id",
  auth,

  userUpdateController.controllers.updateUserGet
);

router.put("/user/:id", auth, userUpdateController.controllers.editUser);

module.exports = router;
