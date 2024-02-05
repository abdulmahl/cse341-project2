const passport = require("passport");
const router = require("express").Router();
const cors = require("cors");

router.use("*", cors());
router.use("/", require("./swagger"));
router.use("/players", require("./routes"));
router.use("/users", require("./user-routes"));
router.get("/home", (req, res) => {
  //#swagger.tags=["Ball Players"]
  res.send(
    "<center><h1 style='color:crimson; padding-top: 15rem; font-size:6rem'>This is the CSE 341 Ball Players Project Home Page: Part-1</h1></center>"
  );
});

router.get("/login", passport.authenticate("github"), (req, res) => {});

module.exports = router;
