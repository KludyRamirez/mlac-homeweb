const express = require("express");
const router = express.Router();
const mainController = require("../controllers/outsidechat/mainController");

const { verifyToken, adminCheck } = require("../middleware/auth");

const auth = verifyToken;
const admin = adminCheck;

router.post(
  "/schedule",
  auth,

  mainController.controllers.createSchedule
);
router.post(
  "/temp-schedule",
  auth,

  mainController.controllers.createTempSchedule
);
router.get("/schedule", auth, mainController.controllers.getSchedule);
router.get(
  "/temp-schedule",
  auth,

  mainController.controllers.getTempSchedule
);
router.get(
  "/schedule/:id",
  auth,

  mainController.controllers.getOneSchedule
);
router.put(
  "/schedule/:id",
  auth,

  mainController.controllers.updateOneSchedule
);
router.delete(
  "/schedule/:id",
  auth,

  mainController.controllers.deleteOneSchedule
);

// test route to verify middleware if working

module.exports = router;
