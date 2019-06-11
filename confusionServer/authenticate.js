var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken");
var User = require("./models/user");
var config = require("./config");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = user => {
  return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

var ops = {};
ops.secretOrKey = config.secretKey;
ops.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

exports.jwtPassport = passport.use(
  new JwtStrategy(ops, (jwt_payload, done) => {
    console.log("JWT_PAYLOAD: " + jwt_payload);
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

exports.verifyUser = passport.authenticate("jwt", { session: false });
