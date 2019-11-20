const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const reviewsSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
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
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Products',
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
const Review = mongoose.model('reviews', reviewsSchema);

module.exports = Review;
