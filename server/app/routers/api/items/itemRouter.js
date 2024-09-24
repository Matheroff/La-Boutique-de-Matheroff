const express = require("express");

const itemRouter = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, read, add } = require("../../../controllers/itemActions");

// Route to get a list of items
itemRouter.get("/", browse);

// Route to get a specific item by ID
itemRouter.get("/:id", read);

// Route to add a new item
itemRouter.post("/", add);

/* ************************************************************************* */

module.exports = itemRouter;
