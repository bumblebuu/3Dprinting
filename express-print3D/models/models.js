const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const basketSchema = new Schema({
  productid: {
    type: Number,
    unique: false,
    required: true,
  },
  userid: {
    type: Number,
    unique: false,
    required: true,
  },
  quantity: {
    type: Number,
    unique: false,
    required: true,
  },
});

const ordersSchema = new Schema({
  insdate: {
    type: Date,
    unique: false,
    required: true,
  },
  userid: {
    type: Number,
    unique: false,
    required: true,
  },
  productid: {
    type: Number,
    unique: false,
    required: true,
  },
  quantity: {
    type: Number,
    unique: false,
    required: true,
  },
  unitprice: {
    type: Number,
    unique: false,
    required: true,
  },
  status: {
    type: String,
    unique: false,
    required: true,
  },
}, {
  timestamps: true,
});

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
    type: [],
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

const reviewsSchema = new Schema({
  insdate: {
    type: Date,
    unique: false,
    required: true,
  },
  productid: {
    type: Number,
    unique: false,
    required: true,
  },
  userid: {
    type: Number,
    unique: false,
    required: true,
  },
  text: {
    type: String,
    unique: false,
    required: true,
  },
  rate: {
    type: Number,
    unique: false,
    required: true,
  },
}, {
  timestamps: true,
});

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
    required: true,
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
  },
  cookie: {
    type: String,
    unique: true,
    required: false,
  },

});

const Basket = mongoose.model('basket', basketSchema);
const Order = mongoose.model('orders', ordersSchema);
const Product = mongoose.model('products', productsSchema);
const Review = mongoose.model('reviews', reviewsSchema);
const User = mongoose.model('users', usersSchema);

module.exports = {
  Basket,
  Order,
  Product,
  Review,
  User,
};
