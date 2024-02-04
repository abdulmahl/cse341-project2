const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const User = require("../model/schema");
const userRouter = require("express").Router();
const controller = require("../controllers/functions");

const client_id = process.env.GITHUB_ID;
const client_secret = process.env.GITHUB_SECRET;
const cbURL = process.env.CALLBACK_URL;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GithubStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: cbURL,
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      User.findOne({ githubId: profile.id })
        .then((currentUser) => {
          if (currentUser) {
            console.log(`Current user: ${currentUser}`);
            done(null, profile);
          } else {
            new User({
              username: profile.username,
              githubId: profile.id,
              thumbnail: profile._json.avatar_url,
            })
              .save()
              .then((newUser) => {
                console.log(`New user created: ${newUser}`);
                done(null, newUser);
              })
              .catch((err) => {
                console.error(`Error creating user ${err}`);
                done(err, null);
              });
          }
        })
        .catch((err) => {
          console.error("Error finding user ", err);
          done(err, null);
        });
    }
  )
);

userRouter.get("/", controller.home)
userRouter.get("/dashboard", controller.dashboard);
userRouter.get("/logout", controller.logout);
userRouter.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  controller.githubCallback
);

module.exports = userRouter;
