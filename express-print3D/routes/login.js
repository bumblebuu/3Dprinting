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

    User.findOne({
      username: userData.username,
      password: userData.password,
    }, (err, obj) => {
      if (err) {
        return next(err);
      }

      const token = tokgen.generate();
      console.log(token);

      User.where(obj).update({
        $set: {
          cookie: token,
        },
      });

      // res.cookie(token);
      return res.redirect('/products');
    });
  } else {
    console.log('All fields are required!');
  }
});

module.exports = router;
