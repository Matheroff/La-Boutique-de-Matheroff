const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const tables = require("../../database/tables"); 


const secretKey = process.env.JWT_SECRET || "secret"; // Utilise une clé secrète forte dans ton .env

// Route pour l'inscription
const register = async (req, res, next) => {
  const user = req.body;

  try {
    // Vérifier si l'email existe déjà
    const existingUser = await tables.user.findByEmail(user.email);
    if (existingUser) {
        return res.status(409).json({ message: "L'utilisateur existe déjà" }); // 409 Conflict
    }

    const insertId = await tables.user.create(user);
    res.status(201).json({ insertId });
} catch (err) {
    next(err);
}
};

// Route pour la connexion
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await tables.user.findByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    const isPasswordValid = await tables.user.verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();

    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const user = await tables.user.read(req.params.id);

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const user = req.body;

    const updated = await tables.user.update(req.params.id, user);

    if (updated == null) {
      res.sendStatus(404);
    } else {
      res.json(updated);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const user = req.body;

  try {
    const insertId = await tables.user.create(user);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const deleted = await tables.user.delete(req.params.id);

    if (deleted == null) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { browse, read, edit, add, destroy, login, register };