const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Basket = require('../models/basket.model');
const Order = require('../models/orders.model');

let newQuantity = 0;
router.get('/', (req, res) => {
  let totalPrice = 0;
  Basket.find({
    user: mongoose.Types.ObjectId('5dce9353a0568e256042f69c'),
  }).populate('product').exec((err, basket) => {
    basket.forEach((element) => {
      totalPrice += element.price * element.quantity;
    });
    res.render('basket', {
      basket,
      total: totalPrice,
    });
  });
});

router.post('/:id', (req, res) => {
  const query = Basket.find({
    user: mongoose.Types.ObjectId('5dce9353a0568e256042f69c'),
    product: req.params.id,
  }).select('quantity -_id');

  query.exec((err, quantity) => {
    if (quantity === undefined) {
      Basket.create({
        quantity: req.body.quantity,
        user: mongoose.Types.ObjectId('5dce9353a0568e256042f69c'),
        product: req.params.id,
        price: req.body.price,
      }, (err, basket) => {
        res.redirect('/basket');
      });
    } else {
      newQuantity = quantity[0].quantity + parseInt(req.body.quantity, 10);
      Basket.update({
        product: req.params.id,
        user: mongoose.Types.ObjectId('5dce9353a0568e256042f69c'),
        price: req.body.price,
      }, {
        quantity: newQuantity,
      }, (err, basket) => {
        res.redirect('/basket');
      });
    }
  });
});

router.post('/remove/:id', (req, res) => {
  const query = Basket.find({
    _id: req.params.id,
  }).select('quantity -_id');

  query.exec((err, quantity) => {
    if (quantity[0].quantity > 0) {
      newQuantity = quantity[0].quantity - 1;
    } else {
      newQuantity = 0;
    }
    console.log(newQuantity);
    Basket.update({
      _id: req.params.id,
    }, {
      quantity: newQuantity,
    }, (err, result) => {
      res.redirect('/basket');
    });
  });
});

module.exports = router;
