"use strict";
const path = require('path');
const express = require("express");
const app = express();
const {addres, mongo_uri} = require(path.join(__dirname,"options"));
const login_router = require(path.join(__dirname,'routers',"login_router"));
const home_router = require(path.join(__dirname,'routers',"home_router"));
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");


var cookieParser = require('cookie-parser');
app.use(cookieParser());


var hbs = require('express-hbs');
app.use(passport.initialize());
require('./models/auth_strategy').pass(passport);
// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials'
}));
app.use(express.static('public'));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(bodyParser({extended:true}));

app.use('/home',home_router);
app.use('/',login_router);
app.use('/',(req,res)=>{res.redirect('/login')});


async function start() {
    try {
        await mongoose.connect(mongo_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(addres.port, addres.host, ()=>{console.log(`Server listening in ${addres.host}:${addres.port}`)});
    } catch (e) {
        console.log(e)
    }
}

start();
