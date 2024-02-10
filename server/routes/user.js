const express = require("express");
const router = express.Router();
const mainController = require("../controllers/outsidechat/mainController");

const { verifyToken, adminCheck } = require("../middleware/auth");

const auth = verifyToken;
const admin = adminCheck;

router.get("/user", auth, mainController.controllers.getUser);
router.get("/user/:id", auth, mainController.controllers.updateUserGet);
router.delete("/user/:id", auth, mainController.controllers.deleteUser);
router.put("/user/:id", mainController.controllers.editUser);

// user absent logs con

router.post("/con", auth, mainController.controllers.userCon);
router.get("/con", auth, mainController.controllers.getUserCon);
router.delete("/con", auth, mainController.controllers.emptyCon);

// user absent logs audit

router.post("/sched-order", auth, mainController.controllers.createSchedOrder);

// user present logs con

router.post("/con-present", auth, mainController.controllers.userConPresent);
router.get("/con-present", auth, mainController.controllers.getUserConPresent);
router.delete("/con-present", auth, mainController.controllers.emptyConPresent);

// user present logs audit

router.post(
  "/sched-order-present",
  auth,
  mainController.controllers.createSchedOrderPresent
);

// handle hash Waitlist Account password

router.post(
  "/hash-password",
  auth,
  mainController.controllers.hashWaitlistUserPassword
);

//

router.put("/change-password", auth, mainController.controllers.changePassword);
router.put("/change-email", auth, mainController.controllers.changeEmail);

module.exports = router;
