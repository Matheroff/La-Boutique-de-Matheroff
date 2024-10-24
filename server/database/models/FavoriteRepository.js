const AbstractRepository = require("./AbstractRepository");

class FavoriteRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "favorite" as configuration
    super({ table: "favorite" });
  }

  // The C of CRUD - Create operation

  async create(favorite) {
    // Execute the SQL INSERT query to add a new favorite to the "favorite" table
    const [result] = await this.database.query(
      `insert into ${this.table} (id_user, id_item) values (?, ?)`,
      [favorite.id_user, favorite.id_item]
    );

    // Return the ID of the newly inserted favorite
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific favorite by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the favorite
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all favorites from the "favorite" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of favorites
    return rows;
  }

  // The U of CRUD - Update operation
  async update(id, favorite) {
    // Execute the SQL UPDATE query to modify an existing favorite
    const [result] = await this.database.query(
      `update ${this.table} set id_user = ?, id_item = ? where id = ?`,
      [favorite.id_user, favorite.id_item, favorite.quantity, id]
    );
  
    // Return the number of affected rows
    return result.affectedRows;
  }
  
  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to remove an favorite by its ID
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
  
    // Return the number of affected rows
    return result.affectedRows;
  }
  
}

module.exports = FavoriteRepository;