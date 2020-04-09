const Notification = require('../models/notification.model');
module.exports = class NotificationModul {
  async checkNotifications(user) {
    let notifications = Notification.find({
      role: 'admin',
      to: user
    }, (err, notifications) => {
      if (err) return next(err);
      return notifications;
    })
    return notifications;
  }
}