const path = require('path');
const express = require("express");
const router = express.Router();
const passport = require("passport");
const mystrategy = require(path.join(__dirname,"..","models","auth_strategy"));
const controller = require(path.join(__dirname,"..","controllers","home_controller"));

router.get("/",passport.authenticate("jwt",{session:false}),controller.home_page);

module.exports = router;