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
  productid: {
    type: String,
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
const Review = mongoose.model('reviews', reviewsSchema);

module.exports = Review;
