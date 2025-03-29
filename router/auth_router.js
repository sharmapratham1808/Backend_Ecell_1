const express = require("express");

const router = express.Router();
const authController = require("../controllers/auth_controllers.js");
const {
  loginSchema,
  signupSchema,
} = require("../validators/auth_validator.js");
const validate = require("../middlewares/validate_middleware.js");
const authMiddleware = require("../middlewares/auth_middleware.js");

router.route("/").get(authController.Home);
router.route("/register").post(validate(signupSchema), authController.Register);
router.route("/login").post(validate(loginSchema), authController.Login);

router.route("/user").get(authMiddleware, authController.user);

module.exports = router;
