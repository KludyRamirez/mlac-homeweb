const express = require("express");
const router = express.Router();
const mainController = require("../controllers/outsidechat/mainController");

const { verifyToken, adminCheck } = require("../middleware/auth");

const auth = verifyToken;
const admin = adminCheck;

router.get("/user", auth, admin, mainController.controllers.getUser);
router.get("/user/:id", auth, admin, mainController.controllers.updateUserGet);
router.delete("/user/:id", auth, admin, mainController.controllers.deleteUser);
router.put("/user/:id", mainController.controllers.editUser);

// usercart

router.post("/con", auth, mainController.controllers.userCon);
router.get("/con", auth, mainController.controllers.getUserCon);
router.delete("/con", auth, mainController.controllers.emptyCon);

// user sched order

router.post("/sched-order", auth, mainController.controllers.createSchedOrder);

module.exports = router;
