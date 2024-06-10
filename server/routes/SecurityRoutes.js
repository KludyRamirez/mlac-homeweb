const express = require("express");
const router = express.Router();
const mainController = require("../controllers/MainController");

const {
  csrfProtection,
  csrfErrorHandler,
} = require("../middlewares/CsrfProtection");

router.get("/csrf-token", csrfProtection, mainController.controllers.getCsrf);

router.use(csrfErrorHandler);

module.exports = router;
