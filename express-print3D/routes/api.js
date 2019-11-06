const Products = require('./../controllers/products.controller');

module.exports = function (router) {
  router.post('/products/create', Products.createProduct);
  router.get('/products/get', Products.getProducts);
  router.get('/products/get/:id', Products.getProduct);
  router.put('/products/update/:id', Products.updateProduct);
  router.delete('/products/remove/:id', Products.removeProduct);
};
