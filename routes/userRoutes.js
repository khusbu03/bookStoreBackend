const express = require("express");
const userRouter = express.Router();

userRouter.get("/findUser/:userId",isAdmin, findUser);
userRouter.post("/updateUser/:userId",userAuth,updateUser);
userRouter.delete("/deleteUser/:userId",userAuth, deleteUser);

module.exports = userRouter;
