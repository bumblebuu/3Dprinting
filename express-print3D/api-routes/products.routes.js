const Products = require('../controllers/products.controller');

module.exports = (router) => {
  router.post('/api/products/add', Products.createProduct);
  router.get('/api/products', Products.getProducts);
  router.get('/api/products/:seo', Products.getProduct);
  router.put('/api/products/update/:seo', Products.updateProduct);
  router.delete('/api/products/delete/:seo', Products.removeProduct);
};
