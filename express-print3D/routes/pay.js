const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Basket = require('../models/basket.model');


router.get('/checkout', (req, res) => {
  let totalPrice = 0;
  Basket.find({
    user: mongoose.Types.ObjectId('5dce9353a0568e256042f69c'),
  }).populate('product').exec((err, found) => {
    found.forEach((element) => {
      totalPrice += element.price * element.quantity;
    });
    if (err) throw err;
    res.render('pay', {
      basket: found,
      total: totalPrice,
    });
  });
});


module.exports = router;
