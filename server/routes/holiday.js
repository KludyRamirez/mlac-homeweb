const express = require("express");
const router = express.Router();
const mainController = require("../controllers/outsidechat/mainController");

const { verifyToken, adminCheck } = require("../middleware/auth");

const auth = verifyToken;
const admin = adminCheck;

router.post("/holiday", auth, mainController.controllers.createHoliday);
router.get("/holiday", auth, mainController.controllers.getHoliday);

// test route to verify middleware if working

module.exports = router;
