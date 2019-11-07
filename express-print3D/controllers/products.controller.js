const Products = require('../daos/products.dao');

exports.createProduct = function (req, res, next) {
  const product = {
    name: req.body.name,
    seo: req.body.seo,
    brand: req.body.brand,
    description: req.body.description,
    img: req.body.img,
    menu: req.body.menu,
    category: req.body.category,
    price: req.body.price,
    isactive: req.body.isactive,
  };

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
    seo: req.params.seo,
  }, (err, product) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      product,
    });
  });
};

exports.updateProduct = function (req, res, next) {
  const product = {
    name: req.body.name,
    seo: req.body.seo,
    brand: req.body.brand,
    description: req.body.description,
    img: req.body.img,
    menu: req.body.menu,
    category: req.body.category,
    price: req.body.price,
    isactive: req.body.isactive,
  };
  Products.update({
    seo: req.params.seo,
  }, product, (err, product) => {
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
  Products.delete({
    seo: req.params.seo,
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
