const express = require('express');

const router = express.Router();

// Product model
const Product = require('../models/products.model');

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
