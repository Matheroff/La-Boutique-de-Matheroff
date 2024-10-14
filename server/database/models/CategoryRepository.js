const AbstractRepository = require("./AbstractRepository");

class CategoryRepository extends AbstractRepository {
  constructor() {
    super({ table: "category" });
  }

  async create(category) {
    const [result] = await this.database.query(
      `insert into ${this.table} (name) values (?)`,
      [category.name]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    return rows;
  }

  async update(category) {
    const [result] = await this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [category.name]
    );
  
    return result.affectedRows;
  }
  
  async delete(id) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
  
    return result.affectedRows;
  }
}

module.exports = CategoryRepository;