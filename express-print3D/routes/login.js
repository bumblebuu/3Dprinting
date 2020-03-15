const express = require('express');

const router = express.Router();

const sha1 = require('sha1');

const TokenGenerator = require('uuid-token-generator');

const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);

const handlebars = require('handlebars');

const User = require('../models/users.model');

const transporter = require('../nodeMailerWithTemp');

const fs = require('fs');


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('login', {
    title: 'Login',
  });
});


router.post('/', async (req, res, next) => {
  if (req.body.userName && req.body.password) {
    const userData = {
      username: req.body.userName,
      password: sha1(req.body.password),
    };


    await User.findOne(userData, (err, obj) => {
      if (err) next(err);
      console.log(obj);
      if (obj === null) {
        return res.render('login', {
          title: 'Login',
          show1: true,
        });
      }
    });


    const token = tokgen.generate();

    res.cookie('uuid', token);

    User.updateOne(
      userData, {
        cookie: token,
      }, (err, result) => {
        if (err) next(err);
      },
    );

    return res.redirect('/products');
  }
  return res.render('login', {
    title: 'Login',
    show2: true,
  });
});


router.get('/forgot', async (req, res, next) => {
  res.render('forgot', {
    title: 'Forgotten',
  })
});

router.post('/forgot', async (req, res, next) => {
  const emailAddress = req.body.email;
  console.log(emailAddress);

  await User.findOne({
    email: emailAddress
  }, (err, obj) => {
    if (err) next(err);
    console.log(obj);
    const user = obj;
    if (obj === null) {
      return res.render('forgot', {
        title: 'Forgotten',
        show: true
      })
    } else {

      const token = tokgen.generate().toString().slice(0, 9);

      const readHTMLFile = function (path, callback) {
        fs.readFile(path, {
          encoding: 'utf-8'
        }, function (err, html) {
          if (err) {
            throw err;
            callback(err);
          } else {
            callback(null, html);
          }
        });
      };

      readHTMLFile(__dirname + './../templates/forgotten-password.html', function (err, html) {
        const template = handlebars.compile(html);
        const replacements = {
          firstname: user.firstname,
          password: token,
          username: user.username,
        };
        const htmlToSend = template(replacements);

        const mailOptions = {
          from: 'beyond.paper.webshop@gmail.com',
          to: emailAddress,
          subject: 'Forgotten password',
          html: htmlToSend,
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log(`Email sent: ${info.response}`);
          }
        });
      })

      User.updateOne(
        {email: emailAddress}, {
          password: sha1(token),
        }, (err, obj) => {
          if (err) next(err);
          console.log(obj);
        },
      );

      res.render('login', {
        title: 'Login',
      });
    }
  });

});

module.exports = router;