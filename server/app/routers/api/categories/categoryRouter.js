const express = require("express");

const categoryRouter = express.Router();

const { browse, read, edit, add, destroy } = require("../../../controllers/categoryActions");

categoryRouter.get("/", browse);

categoryRouter.get("/:id", read);

categoryRouter.put("/:id", edit);

categoryRouter.post("/", add);

categoryRouter.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = categoryRouter;