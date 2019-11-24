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

router.post('/', async (req, res, next) => {
  if (req.body.userName
    && req.body.password
    && req.body.passwordAgain
    && req.body.firstName
    && req.body.lastName
    && req.body.email) {
    // Check if passwords match
    if (req.body.password !== req.body.passwordAgain) {
      const err = new Error('passwords do not match');
      err.status = 400;
      return next(err);
    }

    // Check if this user already exisits
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      return res.status(400).send('That user already exists!');
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
      pictureurl: 'default-man.png',
    };

    // insert into mongo with Schema's create method from mongoose
    User.create(userData, (err, data) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/login');
    });
  }
  else {

  console.log('all fields are required');
  
  }
});

module.exports = router;
