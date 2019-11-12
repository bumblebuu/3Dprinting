const express = require('express');

const router = express.Router();
const multer = require('multer');
const path = require('path');

const DIR = './public/uploads';

const storage = multer.diskStorage({
  destination: (req, file, cob) => {
    cob(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({
  storage,
}).single('photo');

router.post('/', (req, res) => {
  let uploadPath = '';
  upload(req, res, (err) => {
    if (err) {
      // An error occurred when uploading
      console.log(err);
      return res.status(422).send('an Error occured');
    }
    uploadPath = req.file.path;
    return res.send(`Upload Completed for ${uploadPath}`);
  });
});

module.exports = router;