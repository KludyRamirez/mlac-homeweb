const express = require("express");
const router = express.Router();
const mainController = require("../controllers/outsidechat/mainController");

const { verifyToken, adminCheck } = require("../middleware/auth");

const auth = verifyToken;
const admin = adminCheck;

router.get("/logs", auth, admin, mainController.controllers.getLogs);

// test route to verify middleware if working

module.exports = router;
