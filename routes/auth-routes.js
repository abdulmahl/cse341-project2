const authRoute = require("express").Router();
const passport = require("passport");

authRoute.get("/login", (req, res) => {
  res.send("login");
});

authRoute.get("/logout", (req, res) => {
  res.send("logout");
});

authRoute.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

authRoute.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    res.send(req.user);
  }
);

module.exports = authRoute;
