const authRoute = require("express").Router();
const passport = require("passport");

authRoute.get("/login", (req, res) => {
  res.render("login");
});

authRoute.get("/logout", (req, res) => {
  res.render("logout");
});

module.exports = authRoute;
