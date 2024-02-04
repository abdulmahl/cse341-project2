const playerRouter = require("express").Router();
const controller = require("../controllers/functions");
const { isAuthenticated } = require("../model/authenticate");

playerRouter.get("/", controller.getAll);
playerRouter.get("/:id", controller.getByid);
playerRouter.post("/createPlayer", isAuthenticated, controller.createPlayer);
playerRouter.put("/:id", isAuthenticated, controller.updatePlayer);
playerRouter.delete("/:id", isAuthenticated, controller.deletePlayer);

module.exports = playerRouter;
