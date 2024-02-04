const passport = require("passport");
const indexRouter = require("express").Router();

indexRouter.use("/", require("./swagger"));
indexRouter.use("/players", require("./player-route"));
indexRouter.get("/home", (req, res) => {
  //#swagger.tags=["Ball Players"]
  res.send(
    "<center><h1 style='color:crimson; padding-top: 15rem; font-size:6rem'>This is the CSE 341 Ball Players Project Home Page: Part-1</h1></center>"
  );
});

indexRouter.get("/login", passport.authenticate("github"), (req, res) => {});


module.exports = indexRouter;
