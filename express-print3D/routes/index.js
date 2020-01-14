const express = require('express');

const router = express.Router();

const User = require('../models/users.model');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Express',
    user: req.user,
  });
});

router.get('/newsletter', async (req, res, next) => {
  let modal = 'Thank you for subscribing!';
  const emailAddress = req.body.newsLetterEmail;

  const userEmail = await User.findOne({
    email: emailAddress,
  });
  if (userEmail) {
    modal = 'This email is already subscribed, thank you!'
  }

  res.render('index', {
    title: 'Express',
    user: req.user,
    modal,
  });
});

module.exports = router;
