const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const mongoose = require('mongoose');
var User = mongoose.model('User');

//all-test
passport.use(new GoogleStrategy({
    clientID: '931940237699-3r62o8pkkqe8gqq4sp906sjjjobbp2bh.apps.googleusercontent.com',
    clientSecret: '_D3AJIwxlbiHBFBx2j71JIBj',
    callbackURL: "http://localhost:4000/signin-google"
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));