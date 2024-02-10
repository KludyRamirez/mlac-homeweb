const express = require("express");
const router = express.Router();
const userController = require("../controllers/outsidechat/userControllers");

const { verifyToken, adminCheck } = require("../middleware/auth");

const auth = verifyToken;
const admin = adminCheck;

router.get("/user", auth, userController.controllers.getUser);

router.delete("/user/:id", auth, userController.controllers.deleteUser);

// test route to verify middleware if working

module.exports = router;
