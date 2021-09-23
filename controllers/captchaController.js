const Captcha = require('../models/captchaModel');
const AppError = require('../utils/appError');
const { nanoid } = require('nanoid');
exports.generateCaptcha = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return next(new AppError('Name cannot be empty', 404));
    }
    const promocode = nanoid(8);
    const coupanCode = name + promocode;
    const newCoupanCode = coupanCode.toUpperCase();
    console.log(newCoupanCode);
    const result = await Captcha.create({
      value: newCoupanCode,
    });
    res.status(201).json({
      result,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const result = await Captcha.find();
    res.status(200).json({
      result,
    });
  } catch (err) {
    next(err);
  }
};
