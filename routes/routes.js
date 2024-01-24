const router = require("express").Router();
const controller = require("../controllers/functions");

router.get("/", controller.getAll);
router.get("/:id", controller.getByid);
router.post("/createPlayer", controller.createPlayer);
router.put("/:id", controller.updatePlayer);
router.delete("/:id", controller.deletePlayer);

module.exports = router;
