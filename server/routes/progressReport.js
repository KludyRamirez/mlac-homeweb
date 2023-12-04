const express = require("express");
const router = express.Router();
const mainController = require("../controllers/outsidechat/mainController");

const { verifyToken, adminCheck } = require("../middleware/auth");

const auth = verifyToken;
const admin = adminCheck;

router.post("/progrep", auth, admin, mainController.controllers.postProgRep);
router.get("/progrep", auth, admin, mainController.controllers.getProgRep);
// router.get(
//   "/progrep/:id",
//   auth,
//   admin,
//   mainController.controllers.getProgRepId
// );
router.delete(
  "/progrep/:id",
  auth,
  admin,
  mainController.controllers.deleteProgRep
);
router.put("/progrep", mainController.controllers.updateStatusProgRep);
router.put(
  "/progrep/:id/setStatus",
  mainController.controllers.setStatusProgRepCompleted
);

module.exports = router;
