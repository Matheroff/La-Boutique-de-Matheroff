const AbstractRepository = require("./AbstractRepository");

class ThemeRepository extends AbstractRepository {
  constructor() {
    super({ table: "theme" });
  }

  async create(theme) {
    const [result] = await this.database.query(
      `insert into ${this.table} (name) values (?)`,
      [theme.name]
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

  async update(id, theme) {
    const [result] = await this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [theme.name, id]
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

module.exports = ThemeRepository;