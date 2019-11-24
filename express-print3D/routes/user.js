const express = require('express');

const router = express.Router();

const sha1 = require('sha1');
const User = require('../models/users.model');


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.redirect('/user/user-form');
});

router.get('/user-form', (req, res, next) => {
  res.render('user-form', {
    title: 'User account',
    user: req.user,
  });
});

router.post('/user-form/account', (req, res, next) => {
  User.updateOne({
    cookie: req.user.cookie,
  }, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
  }, (err, obj) => {
    if (err) next(err);

    console.log(obj);
  });
  return res.redirect('/user-form');
});


router.post('/user-form/address', (req, res, next) => {
  User.updateOne({
    cookie: req.user.cookie,
  }, {
    address: req.body.address,
  }, (err, obj) => {
    if (err) next(err);

    console.log(obj);
  });

  return res.redirect('/user/user-form');
});

router.post('/user-form/password', (req, res, next) => {
  if (req.user.password !== sha1(req.body.oldPassword)) {
    console.log('Not the same as the old one!');
    return res.redirect('/user/user-form');
  }

  if (req.body.newPassword !== req.body.newPasswordConf) {
    console.log('Not confirmed!');
    return res.redirect('/user/user-form');
  }

  User.updateOne({
    cookie: req.user.cookie,
  }, {
    password: sha1(req.body.newPassword),
  }, (err, obj) => {
    if (err) next(err);

    console.log(obj);
    return res.redirect('/user/user-form');
  });
});

router.post('/user-form/billing', (req, res, next) => {

});

router.delete('/orders', (req, res, next) => {

});

router.delete('/', (req, res, next) => {
  User.deleteOne({
    cookie: req.user.cookie,
  }, (err, obj) => {
    if (err) next(err);
    console.log(obj);
  });
});

module.exports = router;
