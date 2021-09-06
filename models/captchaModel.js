const mongoose = require("mongoose");

const captchaSchema = new mongoose.Schema({
  value: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    expires: "3m",
    default: Date.now,
  },
});

const Captcha = mongoose.model("Captcha", captchaSchema);
module.exports = Captcha;
