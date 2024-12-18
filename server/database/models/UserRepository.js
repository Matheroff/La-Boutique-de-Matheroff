const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async create(user) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (email, password) VALUES (?,?)`,
      [user.email, user.password]
    );
    return result.insertId; // Retourne l'ID du nouvel utilisateur créé
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0]; // Retourne l'utilisateur correspondant à l'ID
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows; // Retourne tous les utilisateurs
  }

  async update(id, user) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET firstname = ?, lastname = ?, email = ?, password = ?, phone_number = ?, adress = ?, postal_code = ?, city = ? , country = ? WHERE id = ?`,
      [user.firstname, user.lastname, user.email, user.password, user.phone_number, user.adress, user.postal_code, user.city, user.country, id]
    );
    return result.affectedRows; // Retourne le nombre de lignes affectées
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result.affectedRows; // Retourne le nombre de lignes supprimées
  }
}

module.exports = UserRepository;


// const bcrypt = require("bcrypt");

// class UserRepository extends AbstractRepository {
//   constructor() {
//     super({ table: "user" });
//   }

//   findOne = async(id) => {
//     const [user] = await this.database.query('SELECT * FROM user WHERE id = ?', [id])
//     return user;
//   }

//   async create(id, user) {
//     const hashedPassword = await bcrypt.hash(user.password, 10); // Hashage du mot de passe
//     const [result] = await this.database.query(
//       `INSERT INTO ${this.table} (firstname, lastname, email, password, phone_number, adress, postal_code, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//       [user.firstname, user.lastname, user.email, hashedPassword, user.phone_number, user.adress, user.postal_code, user.city, id]
//     );
//     return result.insertId;
//   }

//   async findByEmail(email) {
//     const [rows] = await this.database.query(
//       `SELECT * FROM ${this.table} WHERE email = ?`,
//       [email]
//     );
//     return rows[0]; // Retourne l'utilisateur correspondant à l'email
//   }

//   verifyPassword(inputPassword, storedPassword) {
//     return bcrypt.compare(inputPassword, storedPassword); // Vérification du mot de passe
//   }
// }

// module.exports = UserRepository;
