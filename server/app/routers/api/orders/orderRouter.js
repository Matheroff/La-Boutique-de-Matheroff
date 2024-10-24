const express = require("express");

const orderRouter = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import order-related actions
const { browse, read, edit, add, destroy } = require("../../../controllers/orderActions");

// Route to get a list of orders
orderRouter.get("/", browse);

// Route to get a specific order by ID
orderRouter.get("/:id", read);

// Route to edit a specific order
orderRouter.put("/:id", edit);

// Route to add a new order
orderRouter.post("/", add);

// Route to delete order
orderRouter.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = orderRouter;