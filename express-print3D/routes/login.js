const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('login', {
    title: 'Login',
  });
});

router.post('/', (req, res, next) => {
  if (req.body.userName && req.body.password) {
    const userData = {
      username: req.body.username,
      password: req.body.password,
    };
  }
});

module.exports = router;
