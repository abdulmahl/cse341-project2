const express = require("express");
const cors = require("cors");
const connectDB = require("./database/connection");
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;
const User = require("./model/user-model");

const route = require("./routes");
const cookieKey = process.env.COOKIE_KEY;
const client_id = process.env.GITHUB_ID;
const client_secret = process.env.GITHUB_SECRET;
const cbURL = process.env.CALLBACK_URL;
const port = process.env.PORT || 3000;
const app = express();

app
  .use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }))
  .use(cors({ origin: "*" }));

app.set("view engine", "ejs");
app
  .use(express.json())
  .use(
    session({
      secret: cookieKey,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS "
    );
    res.status(200);
    next();
  })
  .use("/", route);

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
              thumbnail: profile._json.avatar_url
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
      // return done(null, profile);
    }
  )
);

app.get("/", (req, res) => {
  res.render("home");
});

// app.use("/dashboard", dashboardRouter);

app.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.render("dashboard", { user: req.session.user });
  } else {
    res.redirect("/");
  }
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging you out ", err);
      return res.redirect("/");
    }
    res.render("home");
  });
});

app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/dashboard/");
  }
);

connectDB();
app.listen(port, () => {
  console.log(`Server running at port: ${port}...`);
});
