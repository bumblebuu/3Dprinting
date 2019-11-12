const express = require('express');

const router = express.Router();
const sha1 = require('sha1');

const User = require('../models/users.model');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('register', {
    title: 'Register',
  });
});

router.post('/', (req, res, next) => {
  if (req.body.userName
    && req.body.password
    && req.body.passwordAgain
    && req.body.firstName
    && req.body.lastName
    && req.body.email) {
    if (req.body.password !== req.body.passwordAgain) {
      const err = new Error('passwords do not match');
      err.status = 400;
      return next(err);
    }

    // create the object we're going to send the mongoose
    const userData = {
      username: req.body.userName,
      password: sha1(req.body.password),
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      gender: req.body.gender || 'none',
      address: req.body.address || 'none',
      pictureurl: req.body.pictureUrl || 'none',
    };

    // insert into mongo with Schema's create method from mongoose
    User.create(userData, (err, data) => {
      if (err) {
        return next(err);
      }
      const user = new this(userData);
      user.save(data);
      return res.redirect('/login');
    });
  }
  const err = new Error('All fields required');
  err.status = 400;
  return next(err);
});

module.exports = router;
