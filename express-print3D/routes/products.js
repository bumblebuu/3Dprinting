const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
// Product model
const Product = require('../models/products.model');
const Review = require('../models/reviews.model');
// get products

router.get('/', (req, res, next) => {
  res.redirect('http://localhost:3000/products/1');
});

router.get('/:page', async (req, res, next) => {
  const perPage = 6;
  const page = req.params.page || 1;
  // const skipMethod = ((perPage * page) - perPage);

  Product
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err);
        res.render('products', {
          products,
          current: page,
          pages: Math.ceil(count / perPage),
        });
      });
    });
});

// get single product
router.get('/product/:seo', (req, res) => {
  if (typeof req.params.seo === 'string') {
    Product.findOne({
      seo: req.params.seo,
    }, (err, product) => {
      Review.find({
        product: product._id,
      }).populate('user').exec((error, reviews) => {
        res.render('product', {
          product,
          reviews,
        });

      });
    });
  }
});

router.post('/reviews', (req, res) => {
  if (req.body.text === '' || req.body.rate === undefined) {
    res.redirect(`/products/product/${req.body.seo}`);
  } else {
    Review.create({
      text: req.body.text,
      rate: req.body.rate,
      product: req.body.product,
      user: req.user._id,
    });
    res.redirect(`/products/product/${req.body.seo}`);
  }
});

module.exports = router;
