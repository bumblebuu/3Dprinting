module.exports = function (mongoose) {
  return [{
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

  }, {
    timestamps: true,
    strict: false,
  }];
};
