module.exports = function (mongoose) {
  return [{
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
  }];
};
