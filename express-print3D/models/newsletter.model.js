const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const newsletterSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  emailaddress: {
    type: String,
    unique: true,
    required: true,
  },
});

const Newsletters = mongoose.model('Newsletters', newsletterSchema);

module.exports = Newsletters;
