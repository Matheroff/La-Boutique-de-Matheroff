const AbstractRepository = require("./AbstractRepository");

class ItemRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "item" as configuration
    super({ table: "item" });
  }

  // The C of CRUD - Create operation

  async create(item) {
    console.info(item)
    console.info("coucou")
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name, description, unit_price, id_category, id_theme) values (?, ?, ?, ?, ?)`,
      [item.name, item.description, item.unit_price, item.id_category, item.id_theme]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of items
    return rows;
  }

  // The U of CRUD - Update operation
  async update(item) {
    // Execute the SQL UPDATE query to modify an existing item
    const [result] = await this.database.query(
      `update ${this.table} set name = ?, description = ?, unit_price = ?, id_category = ?, id_theme = ? where id = ?`,
      [item.name, item.description, item.unit_price, item.id_category, item.id_theme, item.id]
    );
  
    // Return the number of affected rows
    return result.affectedRows;
  }
  
  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to remove an item by its ID
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
  
    // Return the number of affected rows
    return result.affectedRows;
  }
  
}

module.exports = ItemRepository;
