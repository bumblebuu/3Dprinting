const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const productsSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true,
  },
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

const Product = mongoose.model('products', productsSchema);
module.exports = Product;
