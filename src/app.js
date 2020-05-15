'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.2"
    });
});

const create = router.post('/', (req, res, next) => {
    res.status(201).send(req.body); // 1' teste não retornou nada (devido express não sabe trabalhar com JSON - instalar body-parser)
});

const alter = router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body
    });
});

const delet = router.delete('/', (req, res, next) => {
    res.status(200).send(req.body); // 1' teste não retornou nada (devido express não sabe trabalhar com JSON - instalar body-parser)
});

app.use('/', route);
app.use('/products', create);
app.use('/products', alter);
app.use('/products', delet);

module.exports = app;
