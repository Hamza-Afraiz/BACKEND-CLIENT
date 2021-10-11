var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    // path = require('path'),
     {Client} = require('../models/client');

// Local Login Strategy
passport.use(new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'passwordHash',
}, function(username, password, done) {
    Client.findOne({ userName: username }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'Invalid UserName provided' });
        }
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false, { message: 'Invalid Password Provided' });
            }
            return done(null, user);
        });
    });
}));

passport.serializeUser((user, done) => {
    done(null, { _id: user._id, userType: user.userType });
});

passport.deserializeUser((user, done) => {
    Client.findById(user._id, function(err, user) {
        if (user) {
            done(err, user);
        } else {
            return done({ message: 'Unable to find user.' });
        }
    });
});

// passport middlewares
passport.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return next({ message: 'User is not authenticated' });
};

passport.isAuthorized = (userType) => {
    return (req, res, next) => {
        if (req.user.userType == userType) {
            return next();
        }
        return next({ message: 'User is authorized to access this api.' });
    };
};

module.exports = passport;