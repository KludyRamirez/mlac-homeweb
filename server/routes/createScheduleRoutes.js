const express = require("express");
const router = express.Router();
const mainController = require("../controllers/outsidechat/mainController");

const { verifyToken, adminCheck } = require("../middleware/auth");

const auth = verifyToken;
const admin = adminCheck;

router.post(
  "/schedule",
  auth,
  admin,
  mainController.controllers.createSchedule
);
router.post(
  "/temp-schedule",
  auth,
  admin,
  mainController.controllers.createTempSchedule
);
router.get("/schedule", auth, admin, mainController.controllers.getSchedule);
router.get(
  "/temp-schedule",
  auth,
  admin,
  mainController.controllers.getTempSchedule
);
router.get(
  "/schedule/:id",
  auth,
  admin,
  mainController.controllers.getOneSchedule
);
router.put(
  "/schedule/:id",
  auth,
  admin,
  mainController.controllers.updateOneSchedule
);
router.delete(
  "/schedule/:id",
  auth,
  admin,
  mainController.controllers.deleteOneSchedule
);

// test route to verify middleware if working

module.exports = router;
