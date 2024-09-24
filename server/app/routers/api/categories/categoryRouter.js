const express = require("express");

const categoryRouter = express.Router();

const { browse, read } = require("../../../controllers/categoryActions");

categoryRouter.get("/", browse);

categoryRouter.get("/:id", read);

// categoryRouter.post("/", add);

/* ************************************************************************* */

module.exports = categoryRouter;