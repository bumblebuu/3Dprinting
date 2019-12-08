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
let subCategories;

Product.find().distinct('brand', (error, brandList) => {
  brands = brandList;
});
Product.find().distinct('category', (error, categoryList) => {
  categories = categoryList;
});
Product.find().distinct('subcategory', (error, subCategoryList) => {
  subCategories = subCategoryList;
});

router.get('/', (req, res, next) => {
  res.redirect('http://localhost:3000/products/1');
});

router.get('/:page', async (req, res, next) => {
  const perPage = 8;
  const page = req.params.page || 1;
  let categoriesString;
  let brandsString;
  let brandsArr = [];
  let categoriesArr = [];
  let subCategoriesString;
  let subCategoriesArr = [];


  if (url.parse(req.url).query) {
    const search = url.parse(req.url).query;
    const text = search.replace('-', ' ');
    if (text.includes('c=') && text.includes('s=') && text.includes('b=')) {
      let textC = text.slice(2);
      let index1 = (textC.indexOf('=')) - 1;
      let index2 = (textC.lastIndexOf('=')) - 1;
      categoriesString = textC.slice(0, index1);
      subCategoriesString = textC.slice(index1 + 2, index2);
      brandsString = textC.slice(index2 + 2);
    }

    else if (text.includes('c=') && text.includes('s=')){
      let textC = text.slice(2);
      let index1 = (textC.indexOf('=')) - 1;
      categoriesString = textC.slice(0, index1);
      subCategoriesString = textC.slice(index1 + 2);
    }

    else if (text.includes('c=') && text.includes('b=')) {
      let textC = text.slice(2);
      let index1 = (textC.indexOf('=')) - 1;
      categoriesString = textC.slice(0, index1);
      brandsString = textC.slice(index1 + 2);
    }
    
    else if (text.includes('s=') && text.includes('b=')){
      let textC = text.slice(2);
      let index1 = (textC.indexOf('=')) - 1;
      subCategoriesString = textC.slice(0, index1);
      brandsString = textC.slice(index1 + 2);
    }

    else {
      if (text.includes('c=')){
        categoriesString = text.slice(2);
      }
      else if (text.includes('s=')){
        subCategoriesString = text.slice(2);
      }
      else if (text.includes('b=')){
        brandsString = text.slice(2);
      }

    }

    if (!categoriesString) {
      categoriesArr = [];
    } else {
      categoriesArr = categoriesString.split('&');
    }
    if (!subCategoriesString) {
      subCategoriesArr = [];
    } else {
      subCategoriesArr = subCategoriesString.split('&');
    }
    if (!brandsString) {
      brandsArr = [];
    } else {
      brandsArr = brandsString.split('&');
    }

    Product.find({
          $or: [{
              category: {
                $in: categoriesArr,
              },
            },
            {
              subcategory: {
                $in: subCategoriesArr,
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
              subcategory: {
                $in: subCategoriesArr,
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
            title: 'Products',
            products,
            current: page,
            brands,
            categories,
            subCategories,
            categoriesArr,
            brandsArr,
            subCategoriesArr,
            pages: Math.ceil(count / perPage),
            user: req.user,
          });
        });
      });

  } else {
    Product
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, products) => {
        Product.countDocuments().exec((err, count) => {
          if (err) return next(err);
          res.render('products', {
            title: 'Products',
            products,
            current: page,
            brands,
            categories,
            subCategories,
            categoriesArr: [],
            brandsArr: [],
            subCategoriesArr: [],
            pages: Math.ceil(count / perPage),
            user: req.user,
          });
        });
      });
  }
});

// get single product
router.get('/product/:seo', (req, res, next) => {
  if (typeof req.params.seo === 'string') {
    Product.findOne({
      seo: req.params.seo,
    }, async (err, product) => {
      await Review.find({
        product: product._id,
      }).populate('user').sort('-insdate').exec((err, reviews) => {
        if (err) next(err);
        res.render('product', {
          product,
          reviews,
          user: req.user,
        });

      });
    });
  }
});

router.post('/reviews', (req, res, next) => {
  if (req.body.text === '' || req.body.rate === undefined) {
    res.redirect(`/products/product/${req.body.seo}`);
  } else {
    Review.create({
      text: req.body.text,
      rate: req.body.rate,
      product: req.body.product,
      user: req.user._id,
    }, (err, result) => {
      if (err) return next(err);
    });
    res.redirect(`/products/product/${req.body.seo}`);
  }
});

router.get('/reviews/:id', (req, res, next) => {
  Review.findOne({
    _id: req.params.id,
  }, (err, review) => {
    if (err) next(err);
    res.json(review);
  });
});

router.put('/reviews/edit/:id', (req, res, next) => {
  Review.findOneAndUpdate({
    _id: req.params.id,
  }, req.body, (err, review) => {
    if (err) next(err);
    res.json(review);
  });
});

router.get('/reviews/remove/:id', (req, res, next) => {
  Review.findOneAndDelete({
    _id: req.params.id,
  }, (err, review) => {
    if (err) next(err);
    res.redirect('back');
  });
});
module.exports = router;