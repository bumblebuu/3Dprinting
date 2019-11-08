const express = require('express');

const router = express.Router();

// Product model
const Product = require('../models/products.model');

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

module.exports = router;
