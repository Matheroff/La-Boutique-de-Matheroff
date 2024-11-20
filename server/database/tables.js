// Import des fichiers repository
const CartRepository = require("./models/CartRepository");
const CategoryRepository = require("./models/CategoryRepository");
const FavoriteRepository = require("./models/FavoriteRepository");
const ItemRepository = require("./models/ItemRepository");
const OrderRepository = require("./models/OrderRepository");
const ThemeRepository = require("./models/ThemeRepository");
const UserOrderRepository = require("./models/UserOrderRepository");
const UserRepository = require("./models/UserRepository");

// Création de l'objet "tables" vide : servira à stocker chaque repository
// en tant que propriété avec un nom associé à sa table respective
const tables = {};

// Enregistrement des repository dans l'objet "tables"
tables.category = new CategoryRepository();
tables.cart = new CartRepository();
tables.favorite = new FavoriteRepository();
tables.item = new ItemRepository();
tables.order = new OrderRepository();
tables.theme = new ThemeRepository();
tables.user_order = new UserOrderRepository();
tables.user = new UserRepository();

// Utilisation d’un Proxy pour une gestion des erreurs personnalisée
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check l'existance de la propriété (table) dans l'objet "tables"
    if (prop in obj) return obj[prop];

    // Renvoie un message d'erreur si la propriété (table) n'existe pas
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});