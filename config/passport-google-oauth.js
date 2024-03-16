const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require('crypto');
const User = require("../models/User");
const env = require("./environment");

passport.use(new googleStrategy({
    clientID : env.google_clientID,
    clientSecret : env.google_clientSecret,
    callbackURL : env.google_callbackURL
},async function(accessToken,refreshToken, profile,done){
    const user = await User.findOne({email : profile.emails[0].value});
    if(user){
        done(null,user);
    }else{
        const user = await User.create({email : profile.emails[0].value,
                    name : profile.displayName,
                    password : crypto.randomBytes(20).toString('hex') });
        if(user){
            return done(null,user)
        }else{
            console.log(err);
            done(err,false);
        }
    }
}))

module.exports = passport