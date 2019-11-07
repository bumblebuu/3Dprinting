const Products = require('../controllers/products.controller');

module.exports = (router) => {
  router.post('/products/add', Products.createProduct);
  router.get('/products', Products.getProducts);
  router.get('/products/:seo', Products.getProduct);
  router.put('/products/update/:seo', Products.updateProduct);
  router.delete('/products/delete/:seo', Products.removeProduct);
};
