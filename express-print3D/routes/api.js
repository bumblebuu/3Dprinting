const express = require('express');

const router = express.Router();

// Product model
const Product = require('../models/products.model');
const Order = require('../models/orders.model');
const Review = require('../models/reviews.model');
const User = require('../models/users.model');
const Notification = require('../models/notification.model');

// create product
router.post('/products/add', (req, res) => {
  Product.create(req.body, (err, product) => {
    if (err) throw err;
    res.json(product);
  });
});

// get products
router.get('/products', (req, res) => {
  Product.find((err, products) => {
    if (err) throw err;
    res.json(products);
  });
});

// get single article
router.get('/products/:seo', (req, res) => {
  Product.findOne({
    seo: req.params.seo,
  }, (err, product) => {
    if (err) throw err;
    res.json(product);
  });
});

router.get('/products/active/ones', (req, res, next) => {
  Product.find({
    isactive: true,
  }, (err, products) => {
    if (err) throw err;
    res.json(products);
  });
});

router.delete('/products/delete/:seo', (req, res) => {
  Product.findOneAndDelete({
    seo: req.params.seo,
  }, (err, product) => {
    if (err) throw err;
    res.json(product);
  });
});

router.put('/products/update/:seo', (req, res) => {
  Product.findOneAndUpdate({
    seo: req.params.seo,
  }, req.body, (err, product) => {
    if (err) throw err;
    res.json(product);
  });
});


router.get('/orders', (req, res, next) => {
  Order.find({}).populate('user product').sort('-insdate').exec((err, orders) => {
    if (err) return next(err);
    res.json(orders);
  });
});

// router.get('/orders/productsbycategory', (req, res, next) => {
//   Order.aggregate([{
//       $unwind: '$product',
//     }, {
//       $lookup: {
//         from: 'products',
//         localField: 'product',
//         foreignField: '_id',
//         as: 'productData',
//       }
//     }, {
//       $unwind: '$quantity',
//     },
//     {
//       $group: {
//         _id: '$quantity',
//         totalQuantity: {
//           $sum: '$quantity',
//         },
//       },
//     },
//   ], (err, prod) => {
//     if (err) return next(err);
//     res.json(prod)
//   })
// })

router.get('/orders/:id', (req, res, next) => {
  Order.findOne({
    _id: req.params.id,
  }).populate('user product').exec((err, order) => {
    if (err) return next(err);
    res.json(order);
  });
});

router.put('/orders/update/:id', (req, res, next) => {
  Order.findOneAndUpdate({
    _id: req.params.id,
  }, req.body, (err, order) => {
    if (err) return next(err);
    res.json(order);
  });
});

router.delete('/orders/delete/:id', (req, res, next) => {
  Order.findOneAndDelete({
    _id: req.params.id,
  }, (err, order) => {
    if (err) return next(err);
    res.json(order);
  });
});

router.get('/reports/orders', (req, res, next) => {
  Order.find().populate('user product').sort('-insdate').exec((err, orders) => {
    if (err) return next(err)
    res.json(orders)
  })
})
router.get('/reports/products', (req, res, next) => {
  Order.find({
    status: 'delivered'
  }).populate('user product').sort('-insdate').exec((err, orders) => {
    if (err) return next(err)
    res.json(orders)
  })
})

router.get('/reports/orders/insdate', (req, res, next) => {
  Order.distinct('insdate', (err, dates) => {
    if (err) return next(err)
    res.json(dates)
  })
})

router.get('/reports/products/insdate', (req, res, next) => {
  Order.find({
    status: 'delivered'
  }).distinct('insdate', (err, dates) => {
    if (err) return next(err)
    res.json(dates)
  })
})
router.get('/reports/orders/status', (req, res, next) => {
  Order.distinct('status', (err, status) => {
    if (err) return next(err)
    res.json(status)
  })
})

router.get('/reports/products/products', (req, res, next) => {
  Order.find({
    status: 'delivered'
  }).distinct('product', (err, ids) => {
    if (err) return next(err)
    Product.find({
      '_id': {
        $in: ids
      }
    }, (err, products) => {
      if (err) return next(err)
      res.json(products)
    })
  })
})


router.get('/reviews', (req, res, next) => {
  Review.find({}).populate('user product').sort('-insdate').exec((err, reviews) => {
    if (err) return next(err);
    res.json(reviews);
  });
});

router.delete('/reviews/delete/:id', (req, res, next) => {
  Review.findOneAndDelete({
    _id: req.params.id,
  }, (err, review) => {
    if (err) next(err);
    res.json(review);
  });
});

router.get('/users', (req, res, next) => {
  User.find({}).exec((err, users) => {
    if (err) return next(err);
    res.json(users);
  });
});

router.get('/users/:id', (req, res, next) => {
  User.findOne({
    _id: req.params.id,
  }).exec((err, user) => {
    if (err) return next(err);
    res.json(user);
  });
});

router.put('/users/update/:id', (req, res, next) => {
  User.findOneAndUpdate({
    _id: req.params.id,
  }, req.body, (err, user) => {
    if (err) return next(err);
    res.json(user);
  });
});

router.get('/notifications', (req, res, next) => {
  Notification.find({
    role: {
      $ne: 'admin',
    },
  }).sort('-insdate').exec((err, notifications) => {
    if (err) next(err);
    res.json(notifications);
  })
});

router.post('/notifications/add', (req, res, next) => {
  Notification.create(req.body, (err, notification) => {
    if (err) next(err);
    res.json(notification);
  })
})

module.exports = router;