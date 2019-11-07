const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const productsSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  seo: {
    type: String,
    unique: true,
    required: true,
  },
  brand: {
    type: String,
    unique: false,
    required: false,
  },
  description: {
    type: String,
    unique: false,
    required: true,
  },
  img: {
    type: [String],
    unique: false,
    required: true,
  },
  menu: {
    type: String,
    unique: false,
    required: true,
  },
  category: {
    type: String,
    unique: false,
    required: true,
  },
  price: {
    type: Number,
    unique: false,
    required: true,
  },
  isactive: {
    type: Boolean,
    unique: false,
    required: false,
  },
});


module.exports = productsSchema;
