const AbstractRepository = require("./AbstractRepository");

class OrderRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "cart" as configuration
    super({ table: "`order`" });
  }

  // The C of CRUD - Create operation

  async create(userOrder) {
    // Execute the SQL INSERT query to add a new userOrder to the "user_order" table
    const [result] = await this.database.query(
      `insert into ${this.table} (id_item, id_order) values (?, ?)`,
      [userOrder.id_item, userOrder.id_order]
    );

    // Return the ID of the newly inserted order
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific userOrder by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the userOrder
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all userOrders from the "user_order" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of orders
    return rows;
  }

  // The U of CRUD - Update operation
  async update(id, userOrder) {
    // Execute the SQL UPDATE query to modify an existing userOrder
    const [result] = await this.database.query(
      `update ${this.table} set id_item = ?, id_order = ? where id = ?`,
      [userOrder.id_item, userOrder.id_order, id]
    );
  
    // Return the number of affected rows
    return result.affectedRows;
  }
  
  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to remove an userOrder by its ID
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
  
    // Return the number of affected rows
    return result.affectedRows;
  }
  
}

module.exports = OrderRepository;