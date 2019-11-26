const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Basket = require('../models/basket.model');

let newQuantity = 0;
router.get('/', (req, res, next) => {
  let totalPrice = 0;
  Basket.find({
    user: req.user._id,
  }).populate('product').exec((err, basket) => {
    if (err) return next(err);
    basket.forEach((element) => {
      totalPrice += element.price * element.quantity;
    });
    res.render('basket', {
      user: req.user,
      basket,
      total: totalPrice,
    });
  });
});

router.post('/:id', (req, res, next) => {
  const query = Basket.find({
    user: req.user._id,
    product: req.params.id,
  }).select('quantity -_id');

  query.exec((err, quantity) => {
    if (err) return next(err);
    if (quantity[0] === undefined) {
      Basket.create({
        quantity: req.body.quantity,
        user: req.user._id,
        product: req.params.id,
        price: req.body.price,
      }, (err, basket) => {
        if (err) return next(err);
        res.redirect('/basket');
      });
    } else {
      newQuantity = quantity[0].quantity + parseInt(req.body.quantity, 10);
      Basket.update({
        product: req.params.id,
        user: req.user._id,
        price: req.body.price,
      }, {
        quantity: newQuantity,
      }, (err, basket) => {
        if (err) return next(err);
        res.redirect('/basket');
      });
    }
  });
});

router.post('/remove/:id', (req, res, next) => {
  const query = Basket.find({
    _id: req.params.id,
  }).select('quantity -_id');

  query.exec((err, quantity) => {
    if (quantity[0].quantity > 1) {
      newQuantity = quantity[0].quantity - 1;
    } else {
      Basket.remove({
        _id: req.params.id,
      }, (err, removed) => {
        if (err) return next(err);
      });
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
