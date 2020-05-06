const express = require('express');
const router = express.Router();
const Notification = require('./../models/notification.model');

router.get('/', (req, res, next) => {
  Notification.find({
    to: req.user
  }).sort('-insdate').exec((err, allNotifications) => {
    if (err) next(err);
    res.render('notifications', {
      title: 'Notifications',
      allNotifications,
      user: req.user,
      basket: req.basket,
      notifications: req.notifications,
      notificationNum: req.notificationNum
    })
  })
})

module.exports = router;