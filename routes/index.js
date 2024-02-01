const passport = require("passport");
const router = require("express").Router();

router.use("/", require("./swagger"));
router.use("/players", require("./routes"));
router.get("/home", (req, res) => {
  //#swagger.tags=["Ball Players"]
  res.send(
    "<center><h1 style='color:crimson; padding-top: 15rem; font-size:6rem'>This is the CSE 341 Ball Players Project Home Page: Part-1</h1></center>"
  );
});

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", passport.authenticate("github"), (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      return res.redirect("/");
    }
  });
});

module.exports = router;
