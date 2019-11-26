const express = require('express');

const router = express.Router();

// Product model
const Product = require('../models/products.model');
const Order = require('../models/orders.model');

// create product
router.post('/products/add', (req, res) => {
  Product.create(req.body, (err, product) => {
    if (err) throw err;
    res.json(product);
  });
});

// get products
router.get('/products', (req, res) => {
  Product.find((err, products) => {
    if (err) throw err;
    res.json(products);
  });
});

// get single article
router.get('/products/:seo', (req, res) => {
  Product.findOne({
    seo: req.params.seo,
  }, (err, product) => {
    if (err) throw err;
    res.json(product);
  });
});

router.delete('/products/delete/:seo', (req, res) => {
  Product.findOneAndDelete({
    seo: req.params.seo,
  }, (err, product) => {
    if (err) throw err;
    res.json(product);
  });
});

router.put('/products/update/:seo', (req, res) => {
  Product.findOneAndUpdate({
    seo: req.params.seo,
  }, req.body, (err, product) => {
    if (err) throw err;
    res.json(product);
  });
});


router.get('/orders', (req, res, next) => {
  Order.find({}).populate('user product').exec((err, orders) => {
    if (err) return next(err);
    res.json(orders);
  });
});

router.get('/orders/:id', (req, res, next) => {
  Order.findOne({
    _id: req.params.id,
  }).populate('user product').exec((err, order) => {
    if (err) return next(err);
    res.json(order);
  });
});

router.put('/orders/update/:id', (req, res, next) => {
  Order.findOneAndUpdate({
    _id: req.params.id,
  }, req.body, (err, order) => {
    if (err) return next(err);
    res.json(order);
  });
});

router.delete('/orders/delete/:id', (req, res, next) => {
  Order.findOneAndDelete({
    _id: req.params.id,
  }, (err, order) => {
    if (err) return next(err);
    res.json(order);
  });
});

module.exports = router;
