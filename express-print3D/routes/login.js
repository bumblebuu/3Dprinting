const express = require('express');

const router = express.Router();

const sha1 = require('sha1');

const TokenGenerator = require('uuid-token-generator');

const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);

const User = require('../models/users.model');

const regAlerts = require('./../public/scripts/register-alerts');


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('login', {
    title: 'Login',
  });
});


router.post('/', (req, res, next) => {

  if (req.body.userName && req.body.password) {
    const userData = {
      username: req.body.userName,
      password: sha1(req.body.password),
    };

    const token = tokgen.generate();

    res.cookie('uuid', token);

    User.updateOne(
      userData, {
      cookie: token,
    }, (err, result) => {
      if (err) next(err);
    });

    return res.redirect('/products');
  } 
    console.log('All fields are required!');
  
});

module.exports = router;
