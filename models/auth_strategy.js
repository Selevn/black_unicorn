const path = require('path');
const {jwt_key} = require(path.join(__dirname,'..',"options"));
var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['token'];
    }
    return token;
};


var JwtStrategy = require('passport-jwt').Strategy;
    //, ExtractJwt = require('passport-jwt').ExtractJwt;
const users_db = require(path.join(__dirname,'..','models','users'));
var opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = jwt_key;

module.exports.pass = passport => passport.use(new JwtStrategy(opts, async function(payload, done) {
    try {
        const user = await users_db.findOne(
            {
                username: payload.username,
                _id: payload.id,
            }
        ).select('username coins _id');
        if (user) {
            done(null, user)
        } else
            done(null, false)
    }
    catch(e)
    {
        console.log(e);
    }
}));
