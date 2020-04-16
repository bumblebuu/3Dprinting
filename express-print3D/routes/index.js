const express = require('express');
const Products = require('../models/products.model');
const Reviews = require('../models/reviews.model');

const router = express.Router();

const Newsletter = require('../models/newsletter.model');

const transporter = require('../nodeMailerWithTemp');

const fs = require('fs');

const {
  promisify
} = require('util');
const readFile = promisify(fs.readFile);

/* GET home page. */
router.get('/', (req, res, next) => {
  let productCarousel = [];
  let reviewCarousel = [];
  let productNum = 0;
  let reviewNum = 0;
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
    Reviews.find().populate('user').exec(
      async (err, reviews) => {
        if (err) next(err);
        while (reviewCarousel.length < 5) {
          reviewNum = Math.floor(Math.random() * reviews.length + 1);
          if (reviewCarousel.indexOf(reviews[reviewNum]) === -1 && reviews[reviewNum] !== undefined) {
            reviewCarousel.push(reviews[reviewNum]);
          }
        }
        console.log('notifications', req.notifications);
        res.render('index', {
          title: 'Express',
          notifications: req.notifications,
          notificationNum: req.notificationNum,
          basket: req.basket,
          user: req.user,
          productCarousel,
          reviewCarousel
        });
      })
  });

});

router.post('/', async (req, res, next) => {
  let modal = 'Thank you for subscribing!';
  const emailAddress = req.body.newsLetterEmail;

  const htmlfile = await readFile(__dirname + './../templates/subscription-v2.html', 'utf8');

  await Newsletter.findOne({
    emailaddress: emailAddress,
  }, (err, obj) => {
    if (err) next(err);
    if (obj) {
      modal = 'This email is already subscribed, thank you!';
    } else {
      Newsletter.create({
        emailaddress: emailAddress
      }, (err, data) => {
        if (err) {
          return next(err);
        }
      });

      const mailOptions = {
        from: 'beyond.paper.webshop@gmail.com',
        to: emailAddress,
        subject: 'Newsletter subscription',
        html: htmlfile,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      });

    }
  });
  return res.json(modal);
});

module.exports = router;