const express = require("express");
const router = express.Router();

const ctrlAuth = require("../controllers/authentication.controller");
const jwtHelper = require("../config/jwtHelper");

router.post("/register", ctrlAuth.register);
// login with email & password
router.post("/login", ctrlAuth.login);

// login with facebook
router.get("/auth/facebook", ctrlAuth.facebookLogin);
router.get("/auth/facebook/callback", ctrlAuth.facebookLoginCallback);

// login with googl
router.get("/auth/google", ctrlAuth.googleLogin);
router.get("/auth/google/callback", ctrlAuth.googleLoginCallback);

module.exports = router;
