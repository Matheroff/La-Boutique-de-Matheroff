const express = require("express");

const itemsAPIRouter = express.Router();

// Import item-related actions
const { browse, read } = require("../../../controllers/itemsAPIActions");

// Route to get a list of items
itemsAPIRouter.get("/", browse);

// Route to get a specific item by ID
itemsAPIRouter.get("/:id", read);

// Route to add a new item
// itemsAPIRouter.post("/", add);

/* ************************************************************************* */

module.exports = itemsAPIRouter;