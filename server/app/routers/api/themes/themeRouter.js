const express = require("express");

const themeRouter = express.Router();

const { browse, read, edit, add, destroy } = require("../../../controllers/themeActions");

themeRouter.get("/", browse);

themeRouter.get("/:id", read);

themeRouter.put("/:id", edit);

themeRouter.post("/", add);

themeRouter.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = themeRouter;