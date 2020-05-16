module.exports.home_page = function (req,res) {

    res.render('home', {username:req.user.username});
};
module.exports.test_page = function (req,res) {
    res.send("authed "+req.user);
};
