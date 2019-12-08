const express = require('express');

const router = express.Router();

const sha1 = require('sha1');

const TokenGenerator = require('uuid-token-generator');

const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);

const User = require('../models/users.model');


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

    if (!User.findOne(userData)){
      return res.render('login', {
        title: 'Login',
        show1: true,
      });
    }

    const token = tokgen.generate();

    res.cookie('uuid', token);

    User.updateOne(
      userData, {
        cookie: token,
      }, (err, result) => {
        if (err) next(err);
      }
    );

    return res.redirect('/products');

  } else {
    res.render('login', {
      title: 'Login',
      show2: true,
    });
  }
});

module.exports = router;