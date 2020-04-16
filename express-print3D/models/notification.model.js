const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationsSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  insdate: {
    type: Schema.Types.Date,
    unique: false,
    required: true,
    default: Date.now(),
  },
  role: {
    type: Schema.Types.String,
    unique: false,
    required: true,
  },
  notification: {
    type: Schema.Types.String,
    unique: false,
    required: true,
  },
  subject: {
    type: Schema.Types.String,
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Users',
  },
  new: {
    type: Schema.Types.Boolean,
    required: true,
    default: true,
  }
});

const Notification = mongoose.model('Notifications', notificationsSchema);
module.exports = Notification;