const AbstractRepository = require("./AbstractRepository");

class CartRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "cart" as configuration
    super({ table: "cart" });
  }

  // The C of CRUD - Create operation

  async create(cart) {
    // Execute the SQL INSERT query to add a new cart to the "cart" table
    const [result] = await this.database.query(
      `insert into ${this.table} (id_user, id_item, quantity) values (?, ?, ?)`,
      [cart.id_user, cart.id_item, cart.quantity]
    );

    // Return the ID of the newly inserted cart
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific cart by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the cart
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all carts from the "cart" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of carts
    return rows;
  }

  // The U of CRUD - Update operation
  async update(id, cart) {
    // Execute the SQL UPDATE query to modify an existing cart
    const [result] = await this.database.query(
      `update ${this.table} set id_user = ?, id_item = ?, quantity = ? where id = ?`,
      [cart.id_user, cart.id_item, cart.quantity, id]
    );
  
    // Return the number of affected rows
    return result.affectedRows;
  }
  
  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to remove an cart by its ID
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
  
    // Return the number of affected rows
    return result.affectedRows;
  }
  
}

module.exports = CartRepository;