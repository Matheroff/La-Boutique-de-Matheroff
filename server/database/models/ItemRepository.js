const AbstractRepository = require("./AbstractRepository");

class ItemRepository extends AbstractRepository {
  constructor() {
    super({ table: "item" });
  }

  // Le "C" de CRUD - Opération CREATE
  async create(item) {
    // Exécution de la requête SQL pour créer un article (INSERT INTO)
    const [result] = await this.database.query(
      `insert into ${this.table} (name, description, unit_price, id_category, id_theme, image) values (?, ?, ?, ?, ?, ?)`,
      [item.name, item.description, item.unit_price, item.category, item.theme, item.image]
    );

    // Renvoie l'ID du nouvel item
    return result.insertId;
  }

  // Les "R" de CRUD - Opérations READ/READALL

  async read(id) {
    // Exécution de la requête SQL pour sélectionner un article spécifique (SELECT FROM WHERE)
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Renvoie la ligne du résultat qui correspond à l'article
    return rows[0];
  }

  async readAll() {
    // Exécution de la requête SQL pour sélectionner tous les articles (SELECT * FROM)
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Renvoie le tableau des articles
    return rows;
  }

  // Le "U" de CRUD - Opération UPDATE
  async update(id, item) {
    // Exécution de la requête SQL pour modifier un ou plusieurs articles (UPDATE)
    const [result] = await this.database.query(
      `update ${this.table} set name = ?, description = ?, unit_price = ?, id_category = ?, id_theme = ?, image = ? where id = ?`,
      [item.name, item.description, item.unit_price, item.category, item.theme, item.image, id]
    );
  
    // Renvoie le nombre de lignes affectées
    return result.affectedRows;
  }
  
  // Le "D" de CRUD - Opération DELETE
  async delete(id) {
    // Exécution de la requête SQL pour supprimer un article via son ID (DELETE)
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
  
    // Renvoie le nombre de lignes affectées
    return result.affectedRows;
  }
  
}

module.exports = ItemRepository;