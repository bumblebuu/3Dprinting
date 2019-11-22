const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const basketSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  price: {
    type: Number,
    unique: false,
    required: true,
  },
  quantity: {
    type: Number,
    unique: false,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Products',
  },
});


const Basket = mongoose.model('Baskets', basketSchema);
module.exports = Basket;
