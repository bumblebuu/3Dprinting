const express = require('express');
const mongoose = require('mongoose');
const stripe = require('stripe')('sk_test_Nv3q84GIUB0v1TOqzawdKUbX00vVAiQ9sN');

const router = express.Router();
const Basket = require('../models/basket.model');
const Order = require('../models/orders.model');


router.get('/checkout', (req, res) => {
  let totalPrice = 0;
  Basket.find({
    user: mongoose.Types.ObjectId('5dce9353a0568e256042f69c'),
  }).populate('product').exec((err, found) => {
    found.forEach((element) => {
      totalPrice += element.price * element.quantity;
    });
    if (err) throw err;
    res.render('checkout', {
      basket: found,
      total: totalPrice,
    });
  });
});


router.post('/', (req, res) => {
  let totalPrice = 0;
  let totalquantity = 0;
  Basket.find({
    user: mongoose.Types.ObjectId('5dce9353a0568e256042f69c'),
  }).populate('product').exec((err, found) => {
    found.forEach((element) => {
      totalPrice += element.price * element.quantity;
      totalquantity += element.quantity;
    });
    stripe.charges.create({
      amount: parseInt(totalPrice * 100, 10),
      currency: 'usd',
      source: req.body.stripeToken,
      description: 'First charge',
    }, (err, charge) => {
      if (err) throw err;
      Basket.remove({
        user: mongoose.Types.ObjectId('5dce9353a0568e256042f69c'),
      }, (err, removed) => {
        if (err) throw err;
        console.log(`removed ${removed.deletedCount}`);
      });
      const productArray = [];
      for (let i = 0; i < req.body.id.length; i++) {
        const productid = mongoose.Types.ObjectId(req.body.id[i]);
        productArray.push(productid);
      }
      Order.create({
        user: mongoose.Types.ObjectId('5dce9353a0568e256042f69c'),
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
