const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const usersSchema = new Schema({
  firstname: {
    type: String,
    unique: false,
    required: true,
  },
  lastname: {
    type: String,
    unique: false,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: false,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  gender: {
    type: String,
    unique: false,
    required: false,
  },
  address: {
    type: String,
    unique: false,
    required: false,
  },
  pictureurl: {
    type: String,
    unique: false,
    required: false,
  },
  role: {
    type: String,
    unique: false,
    required: false,
    default: 'user',
  },
  cookie: {
    type: String,
    unique: false,
    required: false,
  },
}, {
  versionKey: false, // You should be aware of the outcome after set to false
});

const User = mongoose.model('users', usersSchema);
module.exports = User;
