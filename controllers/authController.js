const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('./../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = async (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
  };
  // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('token', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signUp = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const currUser = await User.create({
      name,
      email,
      password,
      confirmPassword,
    });

    createSendToken(currUser, 201, res);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new AppError('Invalid email or password!!'));
    const user = await User.findOne({ email });
    if (!user || !(await user.correctPassword(password, user.password)))
      return next(new AppError('Incorrect email or Password!'));
    createSendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  let decodedUserId;
  await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    .then((e) => {
      decodedUserId = e.id;
    })
    .catch((err) => {
      new AppError('Authorization denied please login again!', 401);
    });
  // 3) Check if user still exists
  const currentUser = await User.findById(decodedUserId);

  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
};
