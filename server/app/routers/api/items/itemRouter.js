const express = require("express");

const itemRouter = express.Router();

// Import de 5 méthodes (BREAD) depuis le fichier itemActions
const { browse, read, edit, add, destroy } = require("../../../controllers/itemActions");

// Route pour obtenir la liste des articles
itemRouter.get("/", browse);

// Route pour obtenir un article spécifique via son ID
itemRouter.get("/:id", read);

// Route pour éditer / modifier un article via son ID
itemRouter.put("/:id", edit);

// Route pour créer un nouvel article
itemRouter.post("/", add);

// Route pour supprimer un article via son ID
itemRouter.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = itemRouter;
