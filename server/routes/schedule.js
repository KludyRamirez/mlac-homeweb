const express = require("express");
const router = express.Router();
const mainController = require("../controllers/outsidechat/mainController");

const { verifyToken, adminCheck } = require("../middleware/auth");

const auth = verifyToken;
const admin = adminCheck;

// schedule

router.post(
  "/schedule",
  auth,
  admin,
  mainController.controllers.createSchedule
);
router.get("/schedule", auth, admin, mainController.controllers.getSchedule);

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

// temporary schedule

router.post(
  "/temp-schedule",
  auth,
  admin,
  mainController.controllers.createTempSchedule
);

router.get(
  "/temp-schedule",
  auth,
  admin,
  mainController.controllers.getTempSchedule
);

router.delete(
  "/temp-schedule/:id",
  auth,
  admin,
  mainController.controllers.deleteOneTempSchedule
);

router.delete(
  "/temp-schedule",
  auth,
  admin,
  mainController.controllers.deleteTempSchedules
);

// Temporary Solo Schedule

router.post(
  "/temp-soloschedule",
  auth,
  admin,
  mainController.controllers.createTempSoloSchedule
);

router.get(
  "/temp-soloschedule",
  auth,
  admin,
  mainController.controllers.getTempSoloSchedule
);

router.delete(
  "/temp-soloschedule/:id",
  auth,
  admin,
  mainController.controllers.deleteOneTempSoloSchedule
);

router.delete(
  "/temp-soloschedule",
  auth,
  admin,
  mainController.controllers.deleteTempSoloSchedules
);

// isActive status

router.patch(
  "/schedule/:id/setActive",
  auth,
  admin,
  mainController.controllers.setActive
);

router.patch(
  "/temp-schedule/:id/setActiveTemp",
  auth,
  admin,
  mainController.controllers.setActiveTemp
);

router.patch(
  "/temp-soloschedule/:id/setActiveTempSolo",
  auth,
  admin,
  mainController.controllers.setActiveTempSolo
);

router.patch(
  "/schedule/:id/setVideo",
  auth,
  admin,
  mainController.controllers.setVideo
);

router.patch(
  "/schedule/:id/setVideoTempSolo",
  auth,
  admin,
  mainController.controllers.setVideoTempSolo
);

router.post(
  "/schedule-vidoff",
  auth,
  admin,
  mainController.controllers.isVideoOffHandler
);

router.post(
  "/schedule-isactivedef",
  auth,
  admin,
  mainController.controllers.isActiveDefHandler
);

//

router.patch(
  "/schedule/:id/setabsentcounterplus",
  auth,
  admin,
  mainController.controllers.setPlusAbsentCounter
);

router.patch(
  "/schedule/:id/setpresentcounterminus",
  auth,
  admin,
  mainController.controllers.setMinusAbsentCounter
);

router.patch(
  "/schedule/:id/setwaitliststatus",
  auth,
  admin,
  mainController.controllers.setWaitlistStatus
);

module.exports = router;
