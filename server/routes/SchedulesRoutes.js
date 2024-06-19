const express = require("express");
const router = express.Router();
const mainController = require("../controllers/MainController");

const { VerifyJWT } = require("../middlewares/VerifyJWT");
const { VerifyRoles } = require("../middlewares/VerifyRoles");

const auth = VerifyJWT;
const role = VerifyRoles;

// schedule

router.post(
  "/schedule",
  auth,
  role(["Administrator"]),
  mainController.controllers.createSchedule
);
router.get(
  "/schedule",
  auth,
  role(["Administrator", "Parent"]),
  mainController.controllers.getSchedule
);

router.get(
  "/schedule/:id",
  auth,
  role(["Administrator", "Parent"]),
  mainController.controllers.getOneSchedule
);
router.put(
  "/schedule/:id",
  auth,
  role(["Administrator"]),
  mainController.controllers.updateOneSchedule
);

router.put(
  "/scheduleReason/:id",
  auth,
  role(["Administrator", "Parent"]),
  mainController.controllers.updateScheduleReason
);

router.delete(
  "/schedule/:id",
  auth,
  role(["Administrator"]),
  mainController.controllers.deleteOneSchedule
);

router.delete(
  "/schedules/deleteSelected",
  auth,
  role(["Administrator"]),
  mainController.controllers.deleteManySchedule
);

// temporary schedule

router.post(
  "/temp-schedule",
  auth,
  role(["Administrator"]),
  mainController.controllers.createTempSchedule
);

router.get(
  "/temp-schedule",
  auth,
  role(["Administrator"]),
  mainController.controllers.getTempSchedule
);

router.delete(
  "/temp-schedule/:id",
  auth,
  role(["Administrator"]),
  mainController.controllers.deleteOneTempSchedule
);

router.delete(
  "/temp-schedule",
  auth,
  role(["Administrator"]),
  mainController.controllers.deleteTempSchedules
);

router.delete(
  "/temp-schedules/deleteSelected",
  auth,
  role(["Administrator"]),
  mainController.controllers.deleteManyTempSchedule
);

// Temporary Solo Schedule

// router.post(
//   "/temp-soloschedule",
//   auth,

//   mainController.controllers.createTempSoloSchedule
// );

// router.get(
//   "/temp-soloschedule",
//   auth,

//   mainController.controllers.getTempSoloSchedule
// );

// router.delete(
//   "/temp-soloschedule/:id",
//   auth,

//   mainController.controllers.deleteOneTempSoloSchedule
// );

// router.delete(
//   "/temp-soloschedule",
//   auth,

//   mainController.controllers.deleteTempSoloSchedules
// );

// isActive status

// router.patch(
//   "/schedule/:id/setActive",
//   auth,

//   mainController.controllers.setActive
// );

// router.patch(
//   "/temp-schedule/:id/setActiveTemp",
//   auth,

//   mainController.controllers.setActiveTemp
// );

// router.patch(
//   "/temp-soloschedule/:id/setActiveTempSolo",
//   auth,

//   mainController.controllers.setActiveTempSolo
// );

// router.patch(
//   "/schedule/:id/setVideo",
//   auth,

//   mainController.controllers.setVideo
// );

// router.patch(
//   "/schedule/:id/setVideoTempSolo",
//   auth,

//   mainController.controllers.setVideoTempSolo
// );

// router.post(
//   "/schedule-vidoff",
//   auth,

//   mainController.controllers.isVideoOffHandler
// );

// router.post(
//   "/schedule-isactivedef",
//   auth,

//   mainController.controllers.isActiveDefHandler
// );

//

// router.patch(
//   "/schedule/:id/setabsentcounterplus",
//   auth,

//   mainController.controllers.setPlusAbsentCounter
// );

// router.patch(
//   "/schedule/:id/setpresentcounterminus",
//   auth,

//   mainController.controllers.setMinusAbsentCounter
// );

// router.patch(
//   "/schedule/:id/setwaitliststatus",
//   auth,

//   mainController.controllers.setWaitlistStatus
// );

module.exports = router;
