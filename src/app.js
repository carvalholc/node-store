'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

// Conexão Banco de Dados
//mongoose.connect('mongodb+srv://mymatrix:mymatrix@mycluster0-62xea.mongodb.net/mymatrix'); // aparece mensagens no console de "Deprecations"
mongoose.connect('mongodb+srv://mymatrix:mymatrix@mycluster0-62xea.mongodb.net/mymatrix', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// Carrega os Models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;
