// Import du fichier client.js. Ce dernier fournit un objet
// permettant de se connecter à la base de données et à l'interroger
const database = require("../client");

// Prend l'objet "table" en paramètre et en extrait la propriété table (nom de la table dans la BDD)
// Ce nom de table est stocké dans "this.table" pour être réutilisé dans les méthodes des sous-classes
class AbstractRepository {
  constructor({ table }) {
    if (this.constructor === AbstractRepository) {
      throw new TypeError(
        "Abstract class 'AbstractRepository' cannot be instantiated directly"
      );
    }

    // Enregistre le nom de la table spécifiée pour le réutiliser dans des requêtes
    this.table = table;

    // Enregistre le client de BDD importé pour permettre l’interaction avec cette dernière
    this.database = database;
  }
}

module.exports = AbstractRepository;