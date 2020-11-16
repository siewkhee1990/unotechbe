const passport = require('passport')
const mongoose = require('mongoose')
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/user');
const secretKey = process.env.SECRET_KEY;

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies['access_token']) {
        token = req.cookies["access_token"];
    } else if (req && req.headers['access_token']) {
        token = req.headers['access_token'];
    }
    return token;
}

//authorization
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: secretKey
}, (payload, done) => {
    User.findById({ _id: payload.sub }, (err, user) => {
        if (err) {
            return done(err, false)
        }
        if (user) {
            return done(null, user)

        } else return (null, false)
    })
}))


// authenticated local stragety using username and password 

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
        if (err) {
            return done(err)
        }
        else if (!user) {
            return done(null, false);
        } else {
            user.comparePassword(password, done);
        }
    })
}));