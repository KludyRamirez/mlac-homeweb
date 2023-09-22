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
// router.get("/schedule", auth, admin, userController.controllers.getSchedule);
// router.get(
//   "/schedule/:id",
//   auth,
//   admin,
//   userController.controllers.getOneSchedule
// );
// router.put(
//   "/schedule/:id",
//   auth,
//   admin,
//   userController.controllers.updateOneSchedule
// );
// router.delete(
//   "/user/:id",
//   auth,
//   admin,
//   userController.controllers.deleteOneSchedule
// );

// test route to verify middleware if working

module.exports = router;
