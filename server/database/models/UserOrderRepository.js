const AbstractRepository = require("./AbstractRepository");

class UserOrderRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "user_order" as configuration
    super({ table: "`user_order`" });
  }

  // The C of CRUD - Create operation

  async create(userOrder) {
    // Execute the SQL INSERT query to add a new order to the "user_order" table
    const [result] = await this.database.query(
      `insert into ${this.table} (id_item, id_order) values (?, ?)`,
      [userOrder.id_item, userOrder.id_order]
    );
    // Return the ID of the newly inserted order
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific order by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the order
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all orders from the "user_order" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of orders
    return rows;
  }

  // The U of CRUD - Update operation
  async update(id, userOrder) {
    // Execute the SQL UPDATE query to modify an existing order
    const [result] = await this.database.query(
      `update ${this.table} set item_quantity = ?, total_order = ?, order_date = ?, id_user = ?, statut = ?, confirmation_date = ? where id = ?`,
      [userOrder.item_quantity, userOrder.total_order, userOrder.order_date, userOrder.id_user, userOrder.statut, userOrder.confirmation_date, id]
    );
  
    // Return the number of affected rows
    return result.affectedRows;
  }
  
  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to remove an order by its ID
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
  
    // Return the number of affected rows
    return result.affectedRows;
  }
  
}

module.exports = UserOrderRepository;