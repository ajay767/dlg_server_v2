const mongoose = require('mongoose');

const captchaSchema = new mongoose.Schema({
  value: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    expires: '1800',
    default: Date.now,
  },
});

const Captcha = mongoose.model('Captcha', captchaSchema);
module.exports = Captcha;
