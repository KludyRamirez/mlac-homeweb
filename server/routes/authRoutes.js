const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth/authControllers");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");

// backend validation middleware

const registerSchema = Joi.object({
  lastname: Joi.string().min(3).max(24).required(),
  username: Joi.string().min(3).max(24).required(),
  password: Joi.string().min(6).max(24).required(),
  role: Joi.string(),
});

const loginSchema = Joi.object({
  username: Joi.string().min(3).max(24).required(),
  password: Joi.string().min(6).max(24).required(),
});

// traditional routing

router.post(
  "/register",
  validator.body(registerSchema), // backend validation middleware
  authControllers.controllers.postRegister
);
router.post(
  "/login",
  validator.body(loginSchema), // backend validation middleware
  authControllers.controllers.postLogin
);

// test route to verify middleware if working

router.get("/test", auth, (req, res) => {
  res.send("request passed");
});

module.exports = router;
