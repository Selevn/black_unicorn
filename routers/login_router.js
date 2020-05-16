const path = require('path');
const express = require('express');
const router = express.Router();
const controller = require(path.join(__dirname,'..','controllers','login_controller'));
const jsonParser = require('express').json();

router.get('/login',/*auth*/(req,res,next)=>{next()},controller.login_page);
router.get('/register',/*auth*/(req,res,next)=>{next()},controller.register_page);
router.get('/logout',/*auth*/(req,res,next)=>{next()},controller.logout);

router.post('/login',/*auth*/(req,res,next)=>{next()},jsonParser,controller.login_page_post);
router.post('/register',/*auth*/(req,res,next)=>{next()},jsonParser,controller.register_page_post);


module.exports = router;