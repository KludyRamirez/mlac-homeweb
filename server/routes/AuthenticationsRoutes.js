const express = require("express");
const router = express.Router();
const mainController = require("../controllers/MainController");

const {
  csrfProtection,
  csrfErrorHandler,
} = require("../middlewares/CsrfProtection");

const { VerifyJWT } = require("../middlewares/VerifyJWT");

const auth = VerifyJWT;

router.post("/login", mainController.controllers.login);

router.get("/refresh", mainController.controllers.handleRefreshToken);

router.get("/logout", mainController.controllers.handleLogout);

router.post("/register", auth, mainController.controllers.register);

router.post("/forgot", mainController.controllers.forgot);

router.post("/resetpassword/:id/:token", mainController.controllers.reset);

router.post("/change-email", auth, mainController.controllers.changeEmail);

router.post(
  "/change-password",
  auth,
  mainController.controllers.changePassword
);

module.exports = router;
