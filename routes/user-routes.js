const userRouter = require("express").Router();
const controller = require("../controllers/users-function");

userRouter.get("/", controller.getUsers);

module.exports = userRouter;
