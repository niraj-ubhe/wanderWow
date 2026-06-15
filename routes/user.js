const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

const wrapAsync = require("../utils/wrapAsync.js");

const passport = require("passport");

const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

// SIGNUP ROUTES
router
  .route("/signup")

  // Render Signup Form
  .get(userController.renderSignupForm)

  // Signup Route
  .post(
    wrapAsync(userController.signup)
  );

// LOGIN ROUTES
router
  .route("/login")

  // Render Login Form
  .get(userController.renderLoginForm)

  // Login Route
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

// LOGOUT ROUTE
router.get(
  "/logout",
  userController.logout
);


module.exports = router;