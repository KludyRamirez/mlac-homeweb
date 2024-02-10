const express = require("express");
const router = express.Router();
const mainController = require("../controllers/outsidechat/mainController");

const { verifyToken, adminCheck } = require("../middleware/auth");

const auth = verifyToken;
const admin = adminCheck;

router.get("/logs", auth, mainController.controllers.getLogs);
router.get(
  "/logspresent",
  auth,

  mainController.controllers.getLogsPresent
);
router.get("/templogs", auth, mainController.controllers.getTempLogs);
router.get(
  "/tempsolologs",
  auth,

  mainController.controllers.getTempSoloLogs
);

// test route to verify middleware if working

module.exports = router;
