const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Express',
    user: req.user,
  });
});

router.post('/newsletter', (req, res, next) =>{
  const emailAddress = req.body.newsLetterEmail;

  
})

module.exports = router;
