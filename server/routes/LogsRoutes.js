const express = require("express");
const router = express.Router();
const mainController = require("../controllers/MainController");

const { VerifyJWT } = require("../middlewares/VerifyJWT");
const { VerifyRoles } = require("../middlewares/VerifyRoles");

const auth = VerifyJWT;
const role = VerifyRoles;

router.post(
  "/logs",
  auth,
  role(["Administrator"]),
  mainController.controllers.createLogs
);

router.get(
  "/log",
  auth,
  role(["Administrator", "Parent"]),
  mainController.controllers.getLogs
);

router.get(
  "/log/:id",
  auth,
  role(["Administrator", "Parent"]),
  mainController.controllers.getOneLog
);

module.exports = router;
