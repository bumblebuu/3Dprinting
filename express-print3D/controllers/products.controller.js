const Products = require('./../models/models', ProductShema);

exports.createProduct = function (req, res, next) {
  const product = {};

  Products.create(product, (err, product) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: 'Product created successfully',
    });
  });
};

exports.getProducts = function (req, res, next) {
  Products.get({}, (err, products) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      products,
    });
  });
};

exports.getProduct = function (req, res, next) {
  Products.get({
    _id: req.params.id,
  }, (err, products) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      products,
    });
  });
};

exports.updateProduct = function (req, res, next) {
  const product = {};
  Products.update({
    _id: req.params.id,
  }, product, (err, movie) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: 'Product updated successfully',
    });
  });
};

exports.removeProduct = function (req, res, next) {
  Product.delete({
    _id: req.params.id,
  }, (err, product) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: 'Product deleted successfully',
    });
  });
};
