const Notification = require('../models/notification.model');
module.exports = class NotificationModul {
  async checkNotifications(user) {
    let result = []
    await Notification.find({
      to: user
    }, (err, notifications) => {
      if (err) return next(err);
      result.push(notifications);
    })
    await Notification.find({
      to: user,
      new: true
    }, (err, notificationNum) => {
      if (err) return next(err);
      result.push(notificationNum.length);
    })
    return result;
  }
}