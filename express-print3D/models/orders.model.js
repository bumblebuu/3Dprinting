const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ordersSchema = new Schema({
  insdate: {
    type: Date,
    unique: false,
    required: true,
    default: Date.now(),
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

module.exports = ordersSchema;
