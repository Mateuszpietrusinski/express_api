const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

//API Routes
const itemsRoutes = require("./api/routes/items");
const orderRoutes = require("./api/routes/orders");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Routes which should handle requests
app.use("/items", itemsRoutes);
app.use("/orders", orderRoutes);


module.exports = app;