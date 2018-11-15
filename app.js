const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

//API Routes
const productsRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Routes which should handle requests
app.use("/products", productsRoutes);
app.use("/orders", orderRoutes);


module.exports = app;