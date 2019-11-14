const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Basket = require('../models/basket.model');

router.get('/', (req, res) => {
  Basket.find({
    userid: mongoose.Types.ObjectId('5dca9e74a4bf612c3cbb4fb2'),
  }).populate('product').exec((err, basket) => {
    console.log(basket);
    res.render('basket', {
      basket,
    });
  });
});

router.post('/:id', (req, res) => {
  const query = Basket.find({
    userid: mongoose.Types.ObjectId('5dca9e74a4bf612c3cbb4fb2'),
    productid: req.params.id,
  }).select('quantity -_id');

  query.exec((err, quantity) => {
    if (quantity[0] === undefined) {
      Basket.create({
        productid: req.params.id,
        userid: mongoose.Types.ObjectId('5dca9e74a4bf612c3cbb4fb2'),
        quantity: req.body.quantity,
        user: mongoose.Types.ObjectId('5dca9e74a4bf612c3cbb4fb2'),
        product: req.params.id,
      }, (err, basket) => {
        console.log(`THIS ${basket}`);
        res.redirect('/basket');
      });
    } else {
      const addQuantity = quantity[0].quantity + parseInt(req.body.quantity, 10);
      Basket.update({
        productid: req.params.id,
        userid: mongoose.Types.ObjectId('5dca9e74a4bf612c3cbb4fb2'),
      }, {
        quantity: addQuantity,
      }, (err, basket) => {
        console.log(`ready ${basket}`);
        res.redirect('/basket');
      });
    }
  });
  // const quantityNum = Basket.find({
  //     userid: mongoose.Types.ObjectId('5dca9e74a4bf612c3cbb4fb2'),
  //     productid: req.params.id,
  //   }).select(
  //     'quantity'
  //   ),
  // (err, quantity) => {
  // quantity
  // });
});

module.exports = router;
