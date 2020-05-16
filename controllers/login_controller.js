const users_db = require('../models/users');
const jwt = require('jsonwebtoken');
const path = require('path');
const {jwt_key} = require(path.join(__dirname,'..',"options"));

module.exports.login_page = (req,res)=>
{
  res.render("login",{title:"Login"});
};
module.exports.login_page_post = async (req,res)=>
{
  const user = await users_db.findOne(
      {
        username:req.body.login,
        password:req.body.password,
      }
      );
  if(user!=void(0) && user.activated)
    {
        const token = jwt.sign(
            {
                username:user.username,
                id:user._id,
                email:user.email,
                coins:user.coins,
            },
            jwt_key,
            {expiresIn: 60*60}
        );
        res.cookie("token", token).send("go_/home");
    }
  else
    {
        res.redirect("/error");
    }

};

module.exports.register_page = (req,res)=>
{
  res.render("register",{title:"Register"});
};
module.exports.logout = (req,res)=>
{
    res.clearCookie('token');
  res.redirect("/login");

};

module.exports.register_page_post = async (req,res)=>
{
  const user = new users_db(
      {
        username:req.body.login,
        email:req.body.email,
        password:req.body.password,
      }
  );
  try
  {
    await user.save();
    res.send("Gotcha")
  }
  catch (e) {
    res.send(e)
  }


};
