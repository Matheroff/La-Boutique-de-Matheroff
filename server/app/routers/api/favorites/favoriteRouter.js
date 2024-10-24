const express = require("express");

const favoriteRouter = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import favorite-related actions
const { browse, read, edit, add, destroy } = require("../../../controllers/favoriteActions");

// Route to get a list of favorites
favoriteRouter.get("/", browse);

// Route to get a specific favorite by ID
favoriteRouter.get("/:id", read);

// Route to edit a specific favorite
favoriteRouter.put("/:id", edit);

// Route to add a new favorite
favoriteRouter.post("/", add);

// Route to delete favorite
favoriteRouter.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = favoriteRouter;