const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  //#swagger.tags=["Ball Players"]
  res.send(
    "<center><h1 style='color:crimson; padding-top: 15rem; font-size:6rem'>This is the CSE 341 Ball Players Project Home Page: Part-2</h1></center>"
  );
});

router.use("/players", require("./routes"));

module.exports = router;
