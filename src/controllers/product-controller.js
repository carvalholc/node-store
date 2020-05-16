'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');

exports.get = (req, res, next) => {
//    Product.find({})
    Product.find({
                active: true
            }, 'title slug price')
            .then(data => {
                res.status(200).send(data);
            }).catch(e => {
                res.status(400).send(e);
            });
};
    
exports.getBySlug = (req, res, next) => {
//    Product.find({  // Retorna um array. Utilizar "findOne".
    Product.findOne({
        slug: req.params.slug,
                active: true
            }, 'title description slug price tags')
            .then(data => {
                res.status(200).send(data);
            }).catch(e => {
                res.status(400).send(e);
            });
};

exports.getById = (req, res, next) => {
    Product.findById(req.params.id)
            .then(data => {
                res.status(200).send(data);
            }).catch(e => {
                res.status(400).send(e);
            });
};
        
exports.getByTag = (req, res, next) => {
    Product.find({  // testar com "findOne" para um retorno, e para mais de um retorno. 
                tags: req.params.tag,
                active: true
            }, 'title description slug price tags')
            .then(data => {
                res.status(200).send(data);
            }).catch(e => {
                res.status(400).send(e);
            });
};
            
exports.post = (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O title deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'O description deve conter pelo menos 3 caracteres');
    
    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    };

    // Opção 1.
    let product = new Product(req.body);
    product.save()
        .then(x => {
            res.status(201).send({
                message: 'Produto cadastrado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto!',
                data: e
            });
        });
/*
    // Opção 2. Malhor controle. Utilizar sempre esta opção.
    let product = new Product();
    product.title = req.body.title;
    product.slug = req.body.slug;
    // ...
    product.save()
        .then(x => {
            res.status(201).send({
                message: 'Produto cadastrado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao cadastrar o produto!',
                data: e
            });
        });
*/
};

exports.put = (req, res, next) => {
    Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                slug: req.body.slug
            }
        }).then(data => {
            res.status(200).send({
                message: 'Produto atualizado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao atualizar produto.',
                data: e
            });
        });
};

exports.delete = (req, res, next) => {
    Product
        .findOneAndRemove(req.body.id)
        .then(data => {
            res.status(200).send({
                message: 'Produto removido com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao remover produto.',
                data: e
            });
        });
};
