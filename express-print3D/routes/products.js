const express = require('express');

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
        productid: product._id,
      }, (error, reviews) => {
        res.render('product', {
          product,
          reviews,
        });

      });
    });
  }
});

router.post('/reviews', (req, res) => {
  const review = Review.find({
    productid: req.body.productid,
  });
  if (req.body.text === '' || req.body.rate === undefined) {
    Review.find({
      productid: req.body.productid,
    }, (err, review) => {
      if (err) throw err;
      res.render('product', {
        title: 'Product',
        reviews: review,
        // user: req.user || {},
        wrong: 'Please write a review and rate us :)',
      });
    });
  } else {
    Review.create({
      text: req.body.text,
      rate: req.body.rate,
      productid: req.body.productid,
      userid: 1,
    });
    res.redirect('/products');
  }
});

module.exports = router;
