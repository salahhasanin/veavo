var passport = require("passport");
var mongoose = require("mongoose");
const _ = require("lodash");

var User = mongoose.model("User");

module.exports.register = function (req, res) {
  var user = new User();
  user.email = req.body.email;
  user.password = req.body.password;
  user.role = "student";

  user.save((err, doc) => {
    if (err) {
      console.log(err);
    } else {
      var token;
      console.log("success added");
      token = user.generateJwt();
      res.status(200);
      res.json({
        token: token,
        user: doc,
      });
    }
  });
};

module.exports.login = function (req, res) {
  passport.authenticate("local", function (err, user, info) {
    var token;
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        token: token,
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
};

//login with facebook
module.exports.facebookLogin = (req, res, next) => {
  passport.authenticate("facebook");
};

module.exports.facebookLoginCallback = (req, res, next) => {
  passport.authenticate("facebook", { failureRedirect: "/login" }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect("http://http://localhost:4200/profile/?id=" + this.id);
    };
};

//login with google
module.exports.googleLogin = (req, res, next) => {
  passport.authenticate("google", { scope: ["profile"] });
};

module.exports.googleLoginCallback = (req, res, next) => {
  passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect("http://http://localhost:4200/profile/?id=" + this.id);
    };
};
