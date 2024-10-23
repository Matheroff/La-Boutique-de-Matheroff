const express = require("express");

// const jwt = require("jsonwebtoken");

const userRouter = express.Router();

const { browse, read, edit, add, destroy, login, register } = require("../../../controllers/userActions");

userRouter.get("/", browse);

userRouter.get("/:id", read);

userRouter.put("/:id", edit);

userRouter.post("/", add);

userRouter.delete("/:id", destroy);

// Routes d'authentification
// userRouter.post("/register", register); // Pour l'inscription
// userRouter.post("/login", login); // Pour la connexion

/* ************************************************************************* */

module.exports = userRouter;