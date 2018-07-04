const express = require("express");
const user = require("../controllers/user");

const userRouter = express.Router();


userRouter.post("/signup", user.signup );

 userRouter.post("/login", user.login);


module.exports = userRouter;

