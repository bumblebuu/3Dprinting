const express = require('express');
const Products = require('../models/products.model');

const router = express.Router();

const User = require('../models/users.model');

/* GET home page. */
router.get('/', (req, res, next) => {
  let productCarousel = [];
  let productNum = 0;
  Products.find({
    isactive: true,
  }, (err, products) => {
    if (err) next(err);
    while (productCarousel.length < 3) {
      productNum = Math.floor(Math.random() * products.length + 1)
      if (productCarousel.indexOf(products[productNum]) === -1 && products[productNum] !== undefined) {
        productCarousel.push(products[productNum])
      }
    }
    res.render('index', {
      title: 'Express',
      user: req.user,
      productCarousel,
    });
  })
});

router.get('/newsletter', async (req, res, next) => {
  let modal = 'Thank you for subscribing!';
  const emailAddress = req.body.newsLetterEmail;

  const userEmail = await User.findOne({
    email: emailAddress,
  });
  if (userEmail) {
    modal = 'This email is already subscribed, thank you!'
  }

  res.render('index', {
    title: 'Express',
    user: req.user,
    modal,
  });
});

module.exports = router;