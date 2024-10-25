const AbstractRepository = require("./AbstractRepository");

class OrderRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "cart" as configuration
    super({ table: "order" });
  }

  // The C of CRUD - Create operation

  async create(order) {
    // Execute the SQL INSERT query to add a new order to the "order" table
    const [result] = await this.database.query(
      `insert into ${this.table} (item_quantity, total_order, order_date, id_user, statut) values (?, ?, ?, ?, ?)`,
      [order.item_quantity, order.total_order, order.order_date, order.id_user, order.statut]
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
    // Execute the SQL SELECT query to retrieve all orders from the "order" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of orders
    return rows;
  }

  // The U of CRUD - Update operation
  async update(id, order) {
    // Execute the SQL UPDATE query to modify an existing order
    const [result] = await this.database.query(
      `update ${this.table} set item_quantity = ?, total_order = ?, order_date = ?, id_user = ?, statut = ? where id = ?`,
      [order.item_quantity, order.total_order, order.order_date, order.id_user, order.statut, id]
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

module.exports = OrderRepository;