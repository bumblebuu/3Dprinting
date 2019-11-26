const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ordersSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  insdate: {
    type: Date,
    unique: false,
    required: true,
    default: Date.now(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  product: [{
    type: Schema.Types.ObjectId,
    ref: 'Products',
  }],
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

const Order = mongoose.model('Orders', ordersSchema);
module.exports = Order;
