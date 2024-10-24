const express = require("express");

const cartRouter = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import cart-related actions
const { browse, read, edit, add, destroy } = require("../../../controllers/cartActions");

// Route to get a list of carts
cartRouter.get("/", browse);

// Route to get a specific cart by ID
cartRouter.get("/:id", read);

// Route to edit a specific cart
cartRouter.put("/:id", edit);

// Route to add a new cart
cartRouter.post("/", add);

// Route to delete cart
cartRouter.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = cartRouter;