// Importation des variables d'environnement
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Importation de la bibliothèque mysql2 en mode promise : permet d'exécuter les requêtes
// asynchrones et d'utiliser des promesses (async/await) pour gérer les requêtes
const mysql = require("mysql2/promise");
// Création d'un pool de connexion : permet de réutiliser les connexions
// à la base de données plutôt que d'en ouvrir une nouvelle pour chaque requête.
const client = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

client.checkConnection = () => {
  // Tentative de connexion à la base de données
  client
    .getConnection()
    .then((connection) => {
      console.info(`Using database ${DB_NAME}`);

      connection.release();
    })
    .catch((error) => {
      console.warn(
        "Warning:",
        "Failed to establish a database connection.",
        "Please check your database credentials in the .env file if you need a database access."
      );
      console.warn(error.message);
    });
};

// Stockage du nom de la base de données
client.databaseName = DB_NAME;

module.exports = client;
