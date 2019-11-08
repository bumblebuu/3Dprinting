const mongoose = require('mongoose');
const Products = require('../models/products.model');

Products.statics = {
  create(data, cb) {
    const product = new this(data);
    product.save(cb);
  },

  get(query, cb) {
    this.find(query, cb);
  },

  getByName(query, cb) {
    this.find(query, cb);
  },

  update(query, updateData, cb) {
    this.findOneAndUpdate(query, {
      $set: updateData,
    }, {
      new: true,
    }, cb);
  },

  delete(query, cb) {
    this.findOneAndDelete(query, cb);
  },
};

module.exports = Products;
