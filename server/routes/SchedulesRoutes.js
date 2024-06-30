const express = require("express");
const router = express.Router();
const mainController = require("../controllers/MainController");

const { VerifyJWT } = require("../middlewares/VerifyJWT");
const { VerifyRoles } = require("../middlewares/VerifyRoles");

const auth = VerifyJWT;
const role = VerifyRoles;

// schedule

router.post(
  "/schedulevideostatus/:id",
  auth,
  role(["Administrator"]),
  mainController.controllers.createZoomLink
);

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

router.post(
  "/temp-solo",
  auth,
  role(["Administrator"]),
  mainController.controllers.createTempSoloSchedule
);

router.get(
  "/temp-solo",
  auth,
  role(["Administrator"]),
  mainController.controllers.getTempSoloSchedule
);

router.delete(
  "/temp-solo/:id",
  auth,
  role(["Administrator"]),
  mainController.controllers.deleteOneTempSoloSchedule
);

router.delete(
  "/temp-solo",
  auth,
  role(["Administrator"]),
  mainController.controllers.deleteTempSoloSchedules
);

router.delete(
  "/temp-solos/deleteSelected",
  auth,
  role(["Administrator"]),
  mainController.controllers.deleteManyTempSoloSchedule
);

router.patch(
  "/schedule/:id/setVideo",
  auth,
  role(["Administrator"]),
  mainController.controllers.setVideo
);

router.patch(
  "/temp-schedule/:id/setVideo",
  auth,
  role(["Administrator"]),
  mainController.controllers.setTempVideo
);

router.patch(
  "/temp-solo/:id/setVideo",
  auth,
  role(["Administrator"]),
  mainController.controllers.setTempSoloVideo
);

module.exports = router;
