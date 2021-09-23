const User = require('../models/userModel');
const Captcha = require('../models/captchaModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const { promisify } = require('util');

exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password || password.length < 6) {
      return next(
        new AppError('Password is either Empty or less than 6 letters', 400)
      );
    }
    const { coupan } = req.body;
    const allCoupans = await Captcha.find({});
    let availble = false;
    let coupan_id = '';
    allCoupans.forEach((coupans) => {
      if (coupans.value == coupan) {
        availble = true;
        coupan_id = coupans._id;
      }
    });
    if (!availble) {
      return next(new AppError('Coupan is Expired or Invalid !!', 404));
    }
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.password = undefined;
    user.confirmPassword = undefined;
    await Captcha.findByIdAndDelete(coupan_id);
    res.status(201).json({
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError('Email or password is missing', 404));
    }
    const user = await User.findOne({
      email,
    });

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Invalid Email or Password'), 400);
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.password = undefined;
    user.passwordConfirm = undefined;
    res.status(200).json({
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return next(new AppError('You are not logged in !', 400));
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });
    user.password = undefined;
    user.passwordConfirm = undefined;
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

exports.getuser = async (req, res, next) => {
  try {
    const { user } = req;
    res.status(200).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateuser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, {
      runValidators: false,
      new: true,
    });
    user.password = undefined;
    user.confirmPassword = undefined;
    res.status(200).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};
