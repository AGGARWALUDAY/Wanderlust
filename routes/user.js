const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const usercontroller=require("../controllers/user.js");

router.get("/signup",usercontroller.rendersignup);

router.post("/signup",usercontroller.signup);

router.get("/login",usercontroller.renderlogin);

router.post("/login", passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }),saveRedirectUrl, usercontroller.login)
router.get("/logout", usercontroller.logout);
module.exports = router;