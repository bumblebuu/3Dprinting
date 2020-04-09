const Basket = require('../models/basket.model');

module.exports = class BasketModul {
  async checkBasket(user) {
    let basket = await Basket.find({
      user: user,
    }, (err, basketItems) => {
      if (err) return next(err);
      return basketItems;
    })
    return basket;
  }
};