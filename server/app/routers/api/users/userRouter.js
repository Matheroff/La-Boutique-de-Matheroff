const express = require("express");

const userRouter = express.Router();

const { browse, read, edit, add, destroy } = require("../../../controllers/userActions");

userRouter.get("/", browse);

userRouter.get("/:id", read);

userRouter.put("/:id", edit);

userRouter.post("/", add);

userRouter.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = userRouter;