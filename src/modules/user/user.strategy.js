const passport = require('passport')
const {Strategy} = require('passport-jwt');
const {findUser} = require('./user.controller');
module.exports = function () {
    function cookieExtractor (req){
        if(req && req.signedCookies){
          let  token = req.headers.authorization.split(' ')[1];
            return token;
        }
    }
    passport.use("user-jwt", new Strategy({secretOrKey: process.env.JWT_SECRET, jwtFromRequest:cookieExtractor}, function(payload, done){
        let user = findUser(payload.email);

        if(!user) return done( null, false);

        done( null, user);
    }))
};