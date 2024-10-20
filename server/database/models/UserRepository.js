const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async create(user) {
    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, email, password, phone_number, adress, postal_code, city) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      [user.firstname, user.lastname, user.email, user.password, user.phone_number, user.adress, user.postal_code, user.city]
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

  async update(user) {
    const [result] = await this.database.query(
      `update ${this.table} set firstname = ?, lastname = ?, email = ?, password = ?, phone_number = ?, adress = ?, postal_code = ?, city = ? where id = ?`,
      [user.firstname, user.lastname, user.email, user.password, user.phone_number, user.adress, user.postal_code, user.city]
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

module.exports = UserRepository;