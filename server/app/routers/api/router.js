const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
const { sayWelcome } = require("../../controllers/sayActions");

router.get("/", sayWelcome);

const itemsAPIRouter = require("./items/itemsAPIRouter");

router.use("/itemsapi", itemsAPIRouter);

/* ************************************************************************* */

const categoryRouter = require("./categories/categoryRouter");

router.use("/categories", categoryRouter);

/* ************************************************************************* */

const itemRouter = require("./items/itemRouter");

router.use("/items", itemRouter);

/* ************************************************************************* */

const themeRouter = require("./themes/themeRouter");

router.use("/themes", themeRouter);

/* ************************************************************************* */

module.exports = router;
