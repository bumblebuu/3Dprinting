const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const url = require('url');
// Product model
const Product = require('../models/products.model');
const Review = require('../models/reviews.model');

// Categories and brands
let brands;
let categories;

Product.find().distinct('brand', (error, brandList) => {
  brands = brandList;
});
Product.find().distinct('category', (error, categoryList) => {
  categories = categoryList;
});

router.get('/', (req, res, next) => {
  res.redirect('http://localhost:3000/products/1');
});

router.get('/:page', async (req, res, next) => {
  const perPage = 8;
  const page = req.params.page || 1;
  const cookie = req.body.cookie;
  console.log(cookie);

  if (url.parse(req.url).query) {
    const search = url.parse(req.url).query;
    const text = search.slice(2).replace('-', ' ');
    if (search.startsWith('c')) {

      if (text.includes('=')) {

        const index = (text.indexOf('=')) - 1;
        const categoriesString = text.slice(0, index);
        const brandsString = text.slice(index + 2);
        const categoriesArr = categoriesString.split('&');
        const brandsArr = brandsString.split('&');

        Product.find({
            $or: [{
                category: {
                  $in: categoriesArr,
                },
              },
              {
                brand: {
                  $in: brandsArr,
                },
              },
            ],
          })
          .skip((perPage * page) - perPage)
          .limit(perPage)
          .exec((err, products) => {
            Product.countDocuments({
              $or: [{
                  category: {
                    $in: categoriesArr,
                  },
                },
                {
                  brand: {
                    $in: brandsArr,
                  },
                },
              ],
            }).exec((err, count) => {
              if (err) return next(err);
              res.render('products', {
                products,
                current: page,
                brands,
                categories,
                categoriesArr,
                brandsArr,
                pages: Math.ceil(count / perPage),
              });
            });
          });
      } else {
        const categoriesArr = text.split('&');

        Product.find({
            category: {
              $in: categoriesArr,
            },
          })
          .skip((perPage * page) - perPage)
          .limit(perPage)
          .exec((err, products) => {
            Product.countDocuments({
              category: {
                $in: categoriesArr,
              },
            }).exec((err, count) => {
              if (err) return next(err);
              res.render('products', {
                products,
                current: page,
                brands,
                categories,
                categoriesArr,
                brandsArr: [],
                pages: Math.ceil(count / perPage),
              });
            });
          });
      }
    } else {
      const brandsArr = text.split('&');

      Product.find({
          brand: {
            $in: brandsArr,
          },
        })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, products) => {
          Product.countDocuments({
            brand: {
              $in: brandsArr,
            },
          }).exec((err, count) => {
            if (err) return next(err);
            res.render('products', {
              products,
              current: page,
              brands,
              categories,
              brandsArr,
              categoriesArr: [],
              pages: Math.ceil(count / perPage),
            });
          });
        });
    }
  } else {
    Product
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, products) => {
        Product.countDocuments().exec((err, count) => {
          if (err) return next(err);
          res.render('products', {
            products,
            current: page,
            brands,
            categories,
            categoriesArr: [],
            brandsArr: [],
            pages: Math.ceil(count / perPage),
          });
        });
      });
  }
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
