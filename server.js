const express = require("express");
const cors = require("cors");
const connectDB = require("./database/connection");
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;

const route = require("./routes");
const cookieKey = process.env.COOKIE_KEY;
const client_id = process.env.GITHUB_ID;
const client_secret = process.env.GITHUB_SECRET;
const cbURL = process.env.CALLBACK_URL;
const port = process.env.PORT || 3000;
const app = express();

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
  .use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }))
  .use(cors({ origin: "*" }))
  .use("/", route);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GithubStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: cbURL,
    },
    (accessToken, refreshToken, profile, done) => {
      // User.findOrCreate({ githubId: profile.id }, (err, user) => {
      return done(null, profile);
      // });
    }
  )
);


app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `<h1>You are logged in as ${req.session.user.displaName}</h1>`
      : "<h1>You are not logged in...</h1>"
  );
});

app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

connectDB();
app.listen(port, () => {
  console.log(`Server running at port: ${port}...`);
});
