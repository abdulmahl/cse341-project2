const router = require("express").Router();
const controller = require("../controllers/functions");

router.get("/", controller.getAll);
router.get("/:id", controller.getByid);
router.post("/createMember", controller.createMember);

module.exports = router;
