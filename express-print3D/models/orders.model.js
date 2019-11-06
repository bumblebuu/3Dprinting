module.exports = function (mongoose) {
  return [{
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
  }];
};
