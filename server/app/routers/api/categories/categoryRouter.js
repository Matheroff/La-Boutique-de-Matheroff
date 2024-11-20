const express = require("express");

const categoryRouter = express.Router();

// Import de 5 méthodes (BREAD) depuis le fichier categoryActions
const { browse, read, edit, add, destroy } = require("../../../controllers/categoryActions");

// Route pour obtenir la liste des catégories
categoryRouter.get("/", browse);

// Route pour obtenir une catégorie spécifique via son ID
categoryRouter.get("/:id", read);

// Route pour éditer / modifier une catégorie via son ID
categoryRouter.put("/:id", edit);

// Route pour créer une nouvelle catégorie
categoryRouter.post("/", add);

// Route pour supprimer une catégorie via son ID
categoryRouter.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = categoryRouter;