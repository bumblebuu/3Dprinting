const express = require('express');

const router = express.Router();

// Product model
const Product = require('../models/products.model');

// get single article
router.get('/products/:id', (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    res.render('product', {
      product,
    });
  });
});

module.exports = router;
