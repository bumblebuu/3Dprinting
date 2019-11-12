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

    User.findOne({
      username: userData.username,
      password: userData.password,
    }, (err, obj) => {
      if (err) {
        return next(err);
      }
      console.log(obj);

      const token = tokgen.generate();
      User.update(obj, {
        cookie: token,
      });

      return res.redirect('/products');
    });
  }
  console.log('all fields are required');
});

module.exports = router;
