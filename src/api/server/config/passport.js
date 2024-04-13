import LocalStrategy from "passport-local"
import bcrypt from "bcryptjs"
import User from "../models/user"
import settings from "../settings"


var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt
var opts = {}
opts.secretOrKey = settings.jwtSecretKey
const TOKEN_PAYLOAD = {
  id: "user._id",
  email: "user.username",
  scopes: ["user.role"],
}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

function passportMiddleware(passport) {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findOne({ _id: jwt_payload.id }, function (err, user) {
        //console.log(user.username);
        if (err) {
          return done(err, false)
        }
       // console.log("PAYLOAD::" + user)
        if (user) {
          return done(null, {
            id: user.id,
            username: user.username,
            role: user.role,
            customers: user.customers,
            internal: user.internal,
            salers: user.salers,
          })
        } else {
          return done(null, false)
          // or you could create a new account
        }
      })
    })
  )

  passport.use(
    new LocalStrategy.Strategy(
      { usernameField: "username" },
      (username, password, done) => {
        // Match user
        User.findOne({
          username,
        }).then(user => {
          if (!user) {
            return done(null, false, {
              message: "This email is not registered",
            })
          }

          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err
            if (isMatch) {
              return done(null, {
                id: user.id,
                username: user.username,
                role: user.role,
                customer: user.customer,
                internal: user.internal,
                salers: user.salers,
              })
            } else {
              return done(null, false, { message: "Password incorrect" })
            }
          })
        })
      }
    )
  )

  passport.serializeUser((user, done) => {
    process.nextTick(function () {
      //console.log("SERIALIZE::" + user.username)
      done(null, {
        id: user.id,
        username: user.username,
        role: user.role,
        customer: user.customer,
        internal: user.internal,
        salers: user.salers,
      })
    })
  })

  passport.deserializeUser((user, done) => {
    process.nextTick(function () {
      // User.findById(id, function(err, user) {
      //   console.log("DESERIALIZE::" + user.username)
      //   done(err, user);
      // });
      //console.log("DESERIALIZE::" + user)
      done(null, user)
    })
  })
}

export default passportMiddleware
