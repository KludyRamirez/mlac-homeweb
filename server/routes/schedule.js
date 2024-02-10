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

  mainController.controllers.createSchedule
);
router.get("/schedule", auth, mainController.controllers.getSchedule);

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

// temporary schedule

router.post(
  "/temp-schedule",
  auth,

  mainController.controllers.createTempSchedule
);

router.get(
  "/temp-schedule",
  auth,

  mainController.controllers.getTempSchedule
);

router.delete(
  "/temp-schedule/:id",
  auth,

  mainController.controllers.deleteOneTempSchedule
);

router.delete(
  "/temp-schedule",
  auth,

  mainController.controllers.deleteTempSchedules
);

// Temporary Solo Schedule

router.post(
  "/temp-soloschedule",
  auth,

  mainController.controllers.createTempSoloSchedule
);

router.get(
  "/temp-soloschedule",
  auth,

  mainController.controllers.getTempSoloSchedule
);

router.delete(
  "/temp-soloschedule/:id",
  auth,

  mainController.controllers.deleteOneTempSoloSchedule
);

router.delete(
  "/temp-soloschedule",
  auth,

  mainController.controllers.deleteTempSoloSchedules
);

// isActive status

router.patch(
  "/schedule/:id/setActive",
  auth,

  mainController.controllers.setActive
);

router.patch(
  "/temp-schedule/:id/setActiveTemp",
  auth,

  mainController.controllers.setActiveTemp
);

router.patch(
  "/temp-soloschedule/:id/setActiveTempSolo",
  auth,

  mainController.controllers.setActiveTempSolo
);

router.patch(
  "/schedule/:id/setVideo",
  auth,

  mainController.controllers.setVideo
);

router.patch(
  "/schedule/:id/setVideoTempSolo",
  auth,

  mainController.controllers.setVideoTempSolo
);

router.post(
  "/schedule-vidoff",
  auth,

  mainController.controllers.isVideoOffHandler
);

router.post(
  "/schedule-isactivedef",
  auth,

  mainController.controllers.isActiveDefHandler
);

//

router.patch(
  "/schedule/:id/setabsentcounterplus",
  auth,

  mainController.controllers.setPlusAbsentCounter
);

router.patch(
  "/schedule/:id/setpresentcounterminus",
  auth,

  mainController.controllers.setMinusAbsentCounter
);

router.patch(
  "/schedule/:id/setwaitliststatus",
  auth,

  mainController.controllers.setWaitlistStatus
);

module.exports = router;
