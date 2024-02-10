const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth/authControllers");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const { verifyToken } = require("../middleware/auth");

const auth = verifyToken;

// backend validation middleware

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(24).required(),
  firstname: Joi.string().min(3).max(24).required(),
  lastname: Joi.string().min(3).max(24).required(),
  password: Joi.string().min(6).max(24).required(),
  role: Joi.string(),
});

const waitlistSchema = Joi.object({
  username: Joi.string().min(3).max(24).required(),
  firstname: Joi.string().min(3).max(24).required(),
  lastname: Joi.string().min(3).max(24).required(),
  mail: Joi.string().min(3).max(32).required(),
  phone: Joi.string().min(3).max(32).required(),
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
  "/waitlist",
  validator.body(waitlistSchema), // backend validation middleware
  authControllers.controllers.postWaitList
);

router.post(
  "/login",
  validator.body(loginSchema), // backend validation middleware
  authControllers.controllers.postLogin
);

module.exports = router;
