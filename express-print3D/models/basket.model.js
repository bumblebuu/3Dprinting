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

const Basket = mongoose.model('basket', basketSchema);

module.exports = Basket;
