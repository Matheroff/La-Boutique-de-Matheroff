const tables = require("../../database/tables"); 

const browse = async (req, res, next) => {
  try {
    const themes = await tables.theme.readAll();

    res.json(themes);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const theme = await tables.theme.read(req.params.id);

    if (theme == null) {
      res.sendStatus(404);
    } else {
      res.json(theme);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const theme = req.body;

    const updated = await tables.theme.update(req.params.id, theme);

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
  const theme = req.body;

  try {
    const insertId = await tables.theme.create(theme);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const deleted = await tables.theme.delete(req.params.id);

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