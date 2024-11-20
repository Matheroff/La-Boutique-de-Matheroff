// Récupération des données du fichier .env grâce au package dotenv de Node.js
require("dotenv").config();

// Import du fichier client.js
// Vérifie l'accessibilité de la BDD avant l'exécution de l'application
require("./database/client").checkConnection();

// Import de l'application Express depuis app/config.js
const app = require("./app/config");

// Définition du port et récupération des variables d'environnement du fichier .env
const port = process.env.APP_PORT;

// Démarre le serveur en écoutant les requêtes entrantes sur le port défini
app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });