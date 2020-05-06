const express = require('express');

const router = express.Router();
const Order = require('../models/orders.model');
const Notification = require('../models/notification.model');

router.get('/', (req, res, next) => {
  Order.find({
    user: req.user._id,
  }).populate('product').sort('-insdate').exec((err, orders) => {
    if (err) next(err);
    res.render('orders', {
      title: 'Orders',
      orders,
      user: req.user,
      basket: req.basket,
      notificationNum: req.notificationNum,
      notifications: req.notifications,
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
    Notification.create({
      notification: `${req.user.username} cancelled the order`,
      role: req.user.role,
      subject: 'orders',
    }, (err, notification) => {
      if (err) sendStatus(404);
      res.redirect('/orders');
    })
  });
});
module.exports = router;