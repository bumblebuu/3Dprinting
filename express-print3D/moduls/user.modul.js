const express = require('express');

const User = require('../models/users.model');

module.exports = class UserModul {
  async checkLogin(req) {
    if (!req.cookies.uuid) {
      return false;
    }

    const user = await User.findOne({
      cookie: req.cookies.uuid,
    }, (err, obj) => {
      if (err) {
        return next(err);
      }
     
      return obj;
    });
    return user;
  }
};
