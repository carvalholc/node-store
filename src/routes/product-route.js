'use strict'

const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    res.status(201).send(req.body); // 1' teste não retornou nada (devido express não sabe trabalhar com JSON - instalar body-parser)
});

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).send(req.body); // 1' teste não retornou nada (devido express não sabe trabalhar com JSON - instalar body-parser)
});

module.exports = router;
