const tables = require("../../database/tables");

// const categories = [
//     {
//         id: 1,
//         name: "Mugs"
//     },
//     {
//         id: 2,
//         name: "T-Shirts"
//     },
//     {
//         id: 3,
//         name: "Gourdes"
//     },
//     {
//         id: 4,
//         name: "Casquettes"
//     },
//     {
//         id: 5,
//         name: "Stickers"
//     },
//     {
//         id: 6,
//         name: "Porte-clés"
//     }
// ]

const browse = async (req, res, next) => {
  try {
    const categories = await tables.category.readAll();

    res.json(categories);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const category = await tables.category.read(req.params.id);

    if (category == null) {
      res.sendStatus(404);
    } else {
      res.json(category);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const category = req.body;

    const updated = await tables.category.update(req.params.id, category);

    if (updated == null) {
      res.sendStatus(404);
    } else {
      res.json(updated);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const category = req.body;

  try {
    const insertId = await tables.category.create(category);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const deleted = await tables.category.delete(req.params.id);

    if (deleted == null) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { browse, read, edit, add, destroy };