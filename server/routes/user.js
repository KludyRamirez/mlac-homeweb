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

router.post("/user/con", mainController.controllers.userCon);
router.get("/user/con", mainController.controllers.getUserCon);
router.delete("/user/con", mainController.controllers.emptyCon);

// user sched order

router.post("/user/sched-order", mainController.controllers.createSchedOrder);

module.exports = router;
