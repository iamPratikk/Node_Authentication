const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");

router.get("/", passport.checkAuthentication ,userController.home);
router.get("/users/sign-up", userController.signUp);
router.post("/users/create", userController.createUser);
router.get("/users/sign-in", userController.signIn);
router.post("/users/create-session", passport.authenticate("local",{
    failureRedirect : "/users/sign-in"
}) ,userController.createSession);
router.get("/users/sign-out", userController.signOut);
router.get("/users/reset-page",passport.checkAuthentication ,userController.resetPage);
router.post("/users/reset",passport.checkAuthentication ,userController.resetPassword);
router.get("/users/auth/google", passport.authenticate("google", {scope : ["profile", "email"]}));
router.get("/users/auth/google/callback", passport.authenticate("google",{failureRedirect: "/users/sign-in"}), userController.createSession);
router.get("/users/forget_page", userController.forgotPage);
router.post("/users/forget-pass", userController.forgetPassword);

module.exports = router;
