const express = require('express');
const stripe = require('stripe')('sk_test_l8DS0CpgFuwkbnQtTTXIgQPg00N76qw7yn');

const router = express.Router();
const Basket = require('../models/basket.model');
const Order = require('../models/orders.model');
const Notification = require('../models/notification.model');

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
      title: 'Checkout',
      basket: found,
      total: totalPrice,
      notifications: req.notifications,
      notificationNum: req.notificationNum,
      basket: req.basket,
      user: req.user,
    });
  });
});

router.post('/', (req, res, next) => {
  let totalPrice = 0;
  const totalquantity = [];
  let productName = [];
  Basket.find({
    user: req.user._id,
  }).populate('product').exec((err, found) => {
    if (err) return next(err);
    found.forEach((element) => {
      productName.push(element.product.name);
      totalPrice += element.price * element.quantity;
      totalquantity.push({
        [element.product.name]: element.quantity,
      });
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
        status: 'payed',
      });
      let products = productName.join();
      Notification.create({
        notification: `${req.user.username} ordered ${products}`,
        role: req.user.role,
        subject: 'orders',
      })
      res.redirect('/products');
    });
  });
});
module.exports = router;