const express = require('express');

const router = express.Router();
const sha1 = require('sha1');

const User = require('../models/users.model');
const Notification = require('../models/notification.model');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('register', {
    title: 'Register',
  });
});

router.post('/', async (req, res, next) => {
  let picUrl = 'default-man.png';
  if (req.body.userName &&
    req.body.password &&
    req.body.passwordAgain &&
    req.body.firstName &&
    req.body.lastName &&
    req.body.email) {

    // Check sex
    if (req.body.gender == 'female') {
      picUrl = 'default-woman.png';
    }

    // Check if this email is already in use
    const userEmail = await User.findOne({
      email: req.body.email,
    });
    if (userEmail) {
      return res.render('register', {
        title: 'Register',
        show1: true,
      });
    }

    // Check if this username is already in use
    const userName = await User.findOne({
      username: req.body.userName,
    });
    if (userName) {
      return res.render('register', {
        title: 'Register',
        show3: true,
      });
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
      pictureurl: picUrl,
    };

    // insert into mongo with Schema's create method from mongoose
    User.create(userData, (err, data) => {
      if (err) {
        return next(err);
      }
      Notification.create({
        notification: `New user: ${userData.username}`,
        role: 'user',
        subject: 'users',
      }, (err, notification) => {
        if (err) sendStatus(404);
        return res.redirect('/login');
      })
    });
  } else {
    res.render('register', {
      title: 'Register',
      show2: true,
    });
  }
});

module.exports = router;