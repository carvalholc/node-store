'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
//router.get('/:id', controller.getById); // Testar conflito
router.get('/admin/:id', controller.getById);
router.get('/tags/:tag', controller.getByTag);
router.post('/', controller.post);
router.put('/:id', controller.put);
// No delete podemos podemos passar o "id" como parametro da requisição. E no controller utilizar "req.params.id".
//router.delete('/:id', controller.delete);
// ou no delete podemos podemos passar o "id" no corpo da requisição. E no controller utilizar "req.body.id".
router.delete('/', controller.delete);

module.exports = router;
