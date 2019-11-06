const express = require('express');

const router = express.Router();

// Product model
const Product = require('../models/products.model');

// get products
router.get('/', (req, res) => {
  Product.find((err, products) => {
    res.render('products', {
      products,
    });
  });
});

// get single article
router.get('/:seo', (req, res) => {
  Product.findOne({
    seo: req.params.seo,
  }, (err, product) => {
    res.render('product', {
      product,
    });
  });
});

module.exports = router;
