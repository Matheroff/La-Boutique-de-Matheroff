// Import de l'accès à la BDD
const tables = require("../../database/tables");

// Le "B" de BREAD - Opération Browse (Read All)
const browse = async (req, res, next) => {
  try {
    // Récupération de tous les articles depuis la BDD
    const items = await tables.item.readAll();

    // Si la récupération est réussie, renvoie la liste des articles sous forme de JSON
    res.json(items);
  } catch (err) {
    // En cas d'erreur, transmet l'erreur au middleware
    next(err);
  }
};

// Le "R" de BREAD - Opération Read
const read = async (req, res, next) => {
  try {
    // Récupère un article unique à partir de l'ID fourni
    const item = await tables.item.read(req.params.id);

    // Si l'article n'est pas trouvé, renvoie un code HTTP 404 (Not Found)
    if (item == null) {
      res.sendStatus(404);
    } else {
    // Sinon, renvoie l'article sous forme de JSON
      res.json(item);
    }
  } catch (err) {
    // Si erreur, utilise next(err) pour la transmettre au middleware
    next(err);
  }
};

// Le "E" de BREAD - Opération Edit (Update)
const edit = async (req, res, next) => {
  try {
    // Extraction de l'article
    const item = req.body;

    // Mise à jour de l'article dans la BDD en appelant son ID
    const updated = await tables.item.update(req.params.id, item);

    if (updated == null) {
      res.sendStatus(404);
    } else {
      res.json(updated);
    }
  } catch (err) {
    next(err);
  }
};

// Le "A" de BREAD - Opération Add (Create)
const add = async (req, res, next) => {
  // Extraction de l'article
  const item = req.body;
  try {
    // Appelle la table pour y insérer l'article
    const insertId = await tables.item.create(item);

    // En cas de succès, renvoie un code HTTP 201 (Created) et l'ID de l'article créé
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// Le "D" de BREAD - Opération Destroy (Delete)
const destroy = async (req, res, next) => {
  try {
    // Supprime l'article en appelant son ID
    const deleted = await tables.item.delete(req.params.id);

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