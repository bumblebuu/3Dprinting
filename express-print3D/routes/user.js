const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.redirect('/user/account');
});

router.get('/account', (req, res, next) => {
  res.render('account', {
    title: 'User account',
  });
});

router.get('/address', (req, res, next) => {
  res.render('address', {
    title: 'User address',
  });
});

router.get('/changePassword', (req, res, next) => {
  res.render('changePassword', {
    title: 'User password',
  });
});

module.exports = router;
