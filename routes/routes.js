const router = require("express").Router();
const controller = require("../controllers/functions");
const { isAuthenticated } = require("../model/authenticate");

router.get("/", controller.getAll);
router.get("/:id", controller.getByid);
router.post("/createPlayer", isAuthenticated, controller.createPlayer);
router.put("/:id", isAuthenticated, controller.updatePlayer);
router.delete("/:id", isAuthenticated, controller.deletePlayer);

module.exports = router;
