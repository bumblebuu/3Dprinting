const express = require('express');

const router = express.Router();

const fs = require('fs-extra');

const path = require('path');

const sha1 = require('sha1');

const formidable = require('formidable');
const util = require('util');
const User = require('../models/users.model');
const Order = require('../models/orders.model');


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

router.post('/account', (req, res, next) => {
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


router.post('/address', (req, res, next) => {
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

router.post('/password', (req, res, next) => {
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

router.post('/billing', (req, res, next) => {

});

router.post('/upload', (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, file) => {
    // The file name of the uploaded file
    const fileName = req.user.username + file.upload.name;
    console.log(fileName);
    if (!fileName.endsWith('.jpg')
      && !fileName.endsWith('.jpeg')
      && !fileName.endsWith('.png')) {
      console.log('Nope, just jpg and png');
      return res.redirect('/user');
    }

    // Temporary location of our uploaded file
    const tempPath = file.upload.path;

    // Location where we want to copy the uploaded file
    const newLocation = path.join(__dirname, '../public/img/users', fileName);

    fs.copy(tempPath, newLocation, (err) => {
      if (err) {
        console.error(err);
      } else {
        User.updateOne({
          username: req.user.username,
        }, {
          pictureurl: fileName,
        }, (err, result) => {
          if (err) next(err);
          return res.redirect('/user');
        });
      }
    });
  });
});

router.post('/:id', (req, res, next) => {
  let username = '';
  let email = '';
  User.findOne({
    _id: req.params.id,
  }, (err, user) => {
    if (err) return next(err);
    username = user.username;
    email = user.email;
  });

  User.findOneAndUpdate({
    _id: req.params.id,
  }, {
    firstname: 'deleted',
    lastname: 'account',
    username: `${username }deleted`,
    email: `${email }deleted`,
  }, (err, user) => {
    if (err) return next(err);
    res.redirect('../../logout');
  });
});

module.exports = router;
