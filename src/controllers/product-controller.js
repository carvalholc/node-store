'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

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
//        Product.find({  // Retorna um array. Utilizar "findOne".
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
        
        exports.post = (req, res, next) => {
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
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body
    });
};

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
};
