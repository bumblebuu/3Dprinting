module.exports = function (mongoose) {
  return [{
    firstname: {
      type: String,
      unique: false,
      required: true,
    },
    lastname: {
      type: String,
      unique: false,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: false,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    gender: {
      type: String,
      unique: false,
      required: false,
    },
    address: {
      type: String,
      unique: false,
      required: true,
    },
    pictureurl: {
      type: String,
      unique: false,
      required: false,
    },
    role: {
      type: String,
      unique: false,
      required: false,
    },
    cookie: {
      type: String,
      unique: true,
      required: false,
    },
  }, {
    timestamps: true,
    strict: false,
  }];
};
