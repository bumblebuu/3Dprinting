const express = require('express');

const router = express.Router();

// Product model
const Product = require('../models/products.model');

// get products

router.get('/', (req, res, next) => {
  res.redirect('http://localhost:3000/products/1');
});

router.get('/:page', async (req, res, next) => {
  const perPage = 8;
  const page = req.params.page || 1;
  let brands;
  let categories;

  Product.find().distinct('brand', (error, brandList) => {
    brands = brandList;
  });
  Product.find().distinct('category', (error, categoryList) => {
    categories = categoryList;
  });


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
          pages: Math.ceil(count / perPage),
        });
      });
    });
});


// // get single article
// router.get('/:seo', (req, res) => {
//   if (req.params.seo === String) {
//     Product.findOne({
//       seo: req.params.seo,
//     }, (err, product) => {
//       res.render('product', {
//         product,
//       });
//     });
//   }
// });

module.exports = router;
