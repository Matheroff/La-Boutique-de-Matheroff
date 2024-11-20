// Import d'Express
const express = require("express");

const app = express();
// Import de cors
const cors = require("cors");

// Le middleware cors est configuré pour restreindre les requêtes
// autorisées uniquement aux origines spécifiées dans le tableau origin
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      "http://laboutiquedematheroff.com"
    ]
  })
);

// Ce middleware permet à Express de gérer les données JSON dans le body des requêtes
app.use(express.json());

// Import du router
const apiRouter = require("./routers/api/router");

// Configuration des routes, qui seront accessibles via le préfixe "/api"
app.use("/api", apiRouter);

module.exports = app;