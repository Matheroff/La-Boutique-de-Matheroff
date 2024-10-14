const express = require("express");

const itemRouter = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, read, edit, add, destroy } = require("../../../controllers/itemActions");

// Route to get a list of items
itemRouter.get("/", browse);

// Route to get a specific item by ID
itemRouter.get("/:id", read);

// Route to edit a specific item
itemRouter.put("/:id", edit);

// Route to add a new item
itemRouter.post("/", add);

// Route to delete item
itemRouter.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = itemRouter;
