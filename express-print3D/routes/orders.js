const express = require('express');

const router = express.Router();
const Order = require('../models/orders.model');

router.get('/', (req, res, next) => {
  Order.find({
    user: req.user._id,
    status: {
      $ne: 'cancelled',
    },
  }).populate('product').sort('-insdate').exec((err, orders) => {
    if (err) next(err);
    res.render('orders', {
      orders,
      user: req.user,
      basket: req.basket,
      notifications:req.notifications,
    });
  });
});

router.post('/:id', (req, res, next) => {
  Order.update({
    _id: req.params.id,
  }, {
    status: 'cancelled',
  }, (err, cancelled) => {
    if (err) next(err);
    res.redirect('/orders');
  });
});
module.exports = router;
