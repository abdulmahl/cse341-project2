const router = require("express").Router();
const controller = require("../controllers/functions");
const indexRouter = require("./routes")

router.get("/", indexRouter);
router.get("/team", controller.getAll);
router.get("/:id", controller.getByid);
router.post("/createMember", controller.createMember);

module.exports = router;
