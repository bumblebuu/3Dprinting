const express = require('express');
const Products = require('../models/products.model');

const router = express.Router();

const Newsletter = require('../models/newsletter.model');

const mail = require('../nodeMailerWithTemp');

/* GET home page. */
router.get('/', (req, res, next) => {
  const productCarousel = [];
  let productNum = 0;
  Products.find({
    isactive: true,
  }, (err, products) => {
    if (err) next(err);
    while (productCarousel.length < 3) {
      productNum = Math.floor(Math.random() * products.length + 1);
      if (productCarousel.indexOf(products[productNum]) === -1 && products[productNum] !== undefined) {
        productCarousel.push(products[productNum]);
      }
    }
    res.render('index', {
      title: 'Express',
      user: req.user,
      productCarousel,
    });
  });
});

router.post('/', async (req, res, next) => {
  let modal = 'Thank you for subscribing!';
  const emailAddress = req.body.newsLetterEmail;
  console.log(emailAddress);

  await Newsletter.findOne({
    emailaddress: emailAddress,
  }, (err, obj) => {
    if (err) next(err);
    //console.log(obj);
    if (obj) {
      modal = 'This email is already subscribed, thank you!';
    } else {
      //Newsletter.create({emailaddress : emailAddress}, )

      mail.sendSubscribed(emailAddress);
    }
  });

  return res.json(modal);
});

module.exports = router;
