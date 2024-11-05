const express = require("express");

const userOrderRouter = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import order-related actions
const { browse, read, edit, add, destroy } = require("../../../controllers/userOrderActions");

// Route to get a list of orders
userOrderRouter.get("/", browse);

// Route to get a specific userOrder by ID
userOrderRouter.get("/:id", read);

// Route to edit a specific userOrder
userOrderRouter.put("/:id", edit);

// Route to add a new userOrder
userOrderRouter.post("/", add);

// Route to delete userOrder
userOrderRouter.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = userOrderRouter;