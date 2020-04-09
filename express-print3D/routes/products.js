const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const url = require('url');
// Product model
const Product = require('../models/products.model');
const Review = require('../models/reviews.model');
const Notification = require('../models/notification.model');

// Categories and brands
let brands;
let categories;
let subCategories;

Product.find({
  isactive: true,
}).distinct('brand', (error, brandList) => {
  brands = brandList;
});
Product.find({
  isactive: true,
}).distinct('category', (error, categoryList) => {
  categories = categoryList;
});
Product.find({
  isactive: true,
}).distinct('subcategory', (error, subCategoryList) => {
  subCategories = subCategoryList;
});

router.get('/', (req, res, next) => {
  res.redirect('http://localhost:3000/products/1');
});

router.get('/:page', async (req, res, next) => {
  const page = req.params.page || 1;
  let categoriesString;
  let brandsString;
  let brandsArr = [];
  let categoriesArr = [];
  let subCategoriesString;
  let subCategoriesArr = [];
  let perPage = 8;
  let search = '';
  if (url.parse(req.url).query) {
    console.log(url.parse(req.url).query);
    perPage = parseInt(url.parse(req.url).query.slice(0, 2));
    console.log(perPage);
    search = url.parse(req.url).query.slice(2);
    console.log(search);
  }
  console.log(perPage);
  console.log(search);

  if (search.length > 0) {
    const text = search.replace('-', ' ');
    if (text.includes('c=') && text.includes('s=') && text.includes('b=')) {
      const textC = text.slice(2);
      const index1 = (textC.indexOf('=')) - 1;
      const index2 = (textC.lastIndexOf('=')) - 1;
      categoriesString = textC.slice(0, index1);
      subCategoriesString = textC.slice(index1 + 2, index2);
      brandsString = textC.slice(index2 + 2);
    } else if (text.includes('c=') && text.includes('s=')) {
      const textC = text.slice(2);
      const index1 = (textC.indexOf('=')) - 1;
      categoriesString = textC.slice(0, index1);
      subCategoriesString = textC.slice(index1 + 2);
    } else if (text.includes('c=') && text.includes('b=')) {
      const textC = text.slice(2);
      const index1 = (textC.indexOf('=')) - 1;
      categoriesString = textC.slice(0, index1);
      brandsString = textC.slice(index1 + 2);
    } else if (text.includes('s=') && text.includes('b=')) {
      const textC = text.slice(2);
      const index1 = (textC.indexOf('=')) - 1;
      subCategoriesString = textC.slice(0, index1);
      brandsString = textC.slice(index1 + 2);
    } else if (text.includes('c=')) {
      categoriesString = text.slice(2);
    } else if (text.includes('s=')) {
      subCategoriesString = text.slice(2);
    } else if (text.includes('b=')) {
      brandsString = text.slice(2);
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
        isactive: true,
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
          isactive: true,
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
            search,
            perPage,
            pages: Math.ceil(count / perPage),
            notifications: req.notifications,
            basket: req.basket,
            user: req.user,
          });
        });
      });
  } else {
    Product.find({
        isactive: true,
      })
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, products) => {
        Product.countDocuments({
          isactive: true,
        }).exec((err, count) => {
          if (err) return next(err);
          res.render('products', {
            title: 'Products',
            products,
            current: page,
            brands,
            categories,
            subCategories,
            search,
            categoriesArr: [],
            brandsArr: [],
            subCategoriesArr: [],
            perPage,
            pages: Math.ceil(count / perPage),
            basket: req.basket,
            notifications: req.notifications,
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
          notifications: req.notifications,
          basket: req.basket,
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
    Notification.create({
      notification: `${req.user.username} wrote "${req.body.text}"`,
      role: req.user.role,
      subject: 'reviews',
    })
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