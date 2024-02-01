const router = require("express").Router();
const controller = require("../controllers/functions");

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.send("You do not have access");
  } else {
    next();
  }
};

router.get("/", controller.getAll);
router.get("/:id", controller.getByid);
router.post("/createPlayer", authCheck, controller.createPlayer);
router.put("/:id", authCheck, controller.updatePlayer);
router.delete("/:id", authCheck, controller.deletePlayer);

module.exports = router;
