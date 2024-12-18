const express = require("express");

const router = express.Router();

/* ************************************************************************* */

const categoryRouter = require("./categories/categoryRouter");

router.use("/categories", categoryRouter);

/* ************************************************************************* */

const cartRouter = require("./carts/cartRouter");

router.use("/carts", cartRouter);

/* ************************************************************************* */

const favoriteRouter = require("./favorites/favoriteRouter");

router.use("/favorites", favoriteRouter);

/* ************************************************************************* */

const itemRouter = require("./items/itemRouter");

router.use("/items", itemRouter);

/* ************************************************************************* */

const orderRouter = require("./orders/orderRouter");

router.use("/orders", orderRouter);

/* ************************************************************************* */

const themeRouter = require("./themes/themeRouter");

router.use("/themes", themeRouter);

/* ************************************************************************* */

const userOrderRouter = require("./userOrders/userOrdersRouter");

router.use("/userorders", userOrderRouter);

/* ************************************************************************* */

const userRouter = require("./users/userRouter");

router.use("/users", userRouter);

/* ************************************************************************* */

module.exports = router;
