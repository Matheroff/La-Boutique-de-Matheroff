// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all carts from the database
    const carts = await tables.cart.readAll();

    // Respond with the carts in JSON format
    res.json(carts);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific cart from the database based on the provided ID
    const cart = await tables.cart.read(req.params.id);

    // If the cart is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the cart in JSON format
    if (cart == null) {
      res.sendStatus(404);
    } else {
      res.json(cart);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  try {
    // Extract the cart data from the request body
    const cart = req.body;

    // Update the cart in the database based on the provided ID
    const updated = await tables.cart.update(req.params.id, cart);

    // If no rows were updated, respond with HTTP 404 (Not Found)
    // Otherwise, respond with HTTP 200 (OK) and the updated cart
    if (updated == null) {
      res.sendStatus(404);
    } else {
      res.json(updated);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the cart data from the request body
  const cart = req.body;
  try {
    // Insert the cart into the database
    const insertId = await tables.cart.create(cart);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted cart
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the cart from the database based on the provided ID
    const deleted = await tables.cart.delete(req.params.id);

    // If no rows were deleted, respond with HTTP 404 (Not Found)
    // Otherwise, respond with HTTP 204 (No Content)
    if (deleted == null) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = { browse, read, edit, add, destroy };