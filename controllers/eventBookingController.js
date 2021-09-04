const EventBooking = require('./../models/eventBookingModel');
const AppError = require('./../utils/appError');
const shortid = require('shortid');
const Razorpay = require('razorpay');

exports.createBooking = async (req, res, next) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZOR_KEY,
    key_secret: process.env.RAZOR_SECRET,
  });

  const payment_capture = 1;
  const amount = 149;
  const currency = 'INR';

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    let user = undefined;
    user = await EventBooking.findOneAndUpdate(
      {
        email: req.body.email,
        mobile: req.body.mobile,
      },
      { ...req.body },
      { new: true }
    );

    if (!user) {
      user = await EventBooking.create({ ...req.body, amount });
    }
    if (user.paid) {
      return next(
        new AppError('Seat is already booked, please check your mail!', 404)
      );
    }

    res.json({
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      _id: user._id,
      orderId: response.id,
      currency: response.currency,
      amount: response.amount,
      message: 'created payment token',
    });
  } catch (error) {
    next(new AppError(error.message, 404));
  }
};

exports.confirmBooking = async (req, res, next) => {
  try {
    const user = await EventBooking.findByIdAndUpdate(
      req.body._id,
      {
        paid: true,
        paymentId: req.body.paymentId,
        orderId: req.body.orderId,
      },
      { new: true }
    );
    req.user = user;
    next();
  } catch (error) {
    next(new AppError('something wrong happaned', 404));
  }
};

exports.getUser = async (req, res, next) => {
  try {
    let response;

    if (req.query.paid === 'Paid') {
      response = await EventBooking.find({ paid: true });
    } else response = await EventBooking.find({ paid: false });
    res.status(200).json({
      body: response,
      message: 'success',
    });
  } catch (error) {
    next(new AppError('Failed to register user!!', 404));
  }
};
