const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags=["Ball Players"]
  res.render("home", { user: req.user });
});

router.use("/players", require("./routes"));

module.exports = router;
