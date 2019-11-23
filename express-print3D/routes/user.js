const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.redirect('/user/user-form');
});

router.get('/user-form', (req, res, next) => {
  res.render('user-form', {
    title: 'User account',
  });
});

router.post('/user-form/account', (req, res, next) => {
  
});

router.post('/user-form/address', (req, res, next) => {

});

router.post('/user-form/password', (req, res, next) => {

});

router.post('/user-form/billing', (req, res, next) => {
  
});

router.delete('/orders', (req, res, next) => {

});

router.delete('/delete', (req, res, next) => {

});

module.exports = router;
