const express = require('express');
const mongoose = require('mongoose');
const stripe = require('stripe')('sk_test_l8DS0CpgFuwkbnQtTTXIgQPg00N76qw7yn');

const router = express.Router();
const Basket = require('../models/basket.model');
const Order = require('../models/orders.model');


router.get('/checkout', (req, res, next) => {
  let totalPrice = 0;
  Basket.find({
    user: req.user._id,
  }).populate('product').exec((err, found) => {
    if (err) return next(err);
    found.forEach((element) => {
      totalPrice += element.price * element.quantity;
    });
    res.render('checkout', {
      basket: found,
      total: totalPrice,
      user: req.user,
    });
  });
});

router.post('/', (req, res, next) => {
  let totalPrice = 0;
  let totalquantity = 0;
  Basket.find({
    user: req.user._id,
  }).populate('product').exec((err, found) => {
    if (err) return next(err);
    found.forEach((element) => {
      totalPrice += element.price * element.quantity;
      totalquantity += element.quantity;
    });
    stripe.charges.create({
      amount: parseInt(totalPrice * 100, 10),
      currency: 'usd',
      source: req.body.stripeToken,
      description: 'Beyond Paper shopping',
    }, (error, charge) => {
      if (error) return next(error);
      Basket.deleteMany({
        user: req.user._id,
      }, (e, removed) => {
        if (e) return next(e);
      });
      const productArray = [];
      if (typeof req.body.id === 'object') {
        for (let i = 0; i < req.body.id.length; i++) {
          const productid = req.body.id[i];
          productArray.push(productid);
        }
      } else {
        productArray.push(req.body.id);
      }
      Order.create({
        user: req.user._id,
        product: productArray,
        quantity: totalquantity,
        unitprice: totalPrice,
        status: 'Payed',
      });
      res.redirect('/products');
    });
  });
});
module.exports = router;
