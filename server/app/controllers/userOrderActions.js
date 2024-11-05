// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all orders from the database
    const userOrders = await tables.userOrder.readAll();

    // Respond with the orders in JSON format
    res.json(userOrders);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific order from the database based on the provided ID
    const userOrder = await tables.userOrder.read(req.params.id);

    // If the order is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the order in JSON format
    if (userOrder == null) {
      res.sendStatus(404);
    } else {
      res.json(userOrder);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  try {
    // Extract the order data from the request body
    const userOrder = req.body;

    // Update the order in the database based on the provided ID
    const updated = await tables.userOrder.update(req.params.id, userOrder);

    // If no rows were updated, respond with HTTP 404 (Not Found)
    // Otherwise, respond with HTTP 200 (OK) and the updated order
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
  // Extract the order data from the request body
  const userOrder = req.body;
  try {
    // Insert the order into the database
    const insertId = await tables.userOrder.create(userOrder);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted order
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the order from the database based on the provided ID
    const deleted = await tables.userOrder.delete(req.params.id);

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