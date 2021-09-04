const mongoose = require('mongoose');

const eventBookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter your name'],
  },
  paid: {
    type: Boolean,
    default: false,
  },
  amount: {
    type: Number,
  },
  email: {
    type: String,
    required: [true, 'please enter your email.'],
  },
  mobile: {
    type: Number,
    required: [true, 'please enter your mobile no.'],
  },
  gender: {
    type: String,
    required: [true, 'please enter your gender.'],
  },
  year: {
    type: Number,
    required: [true, 'please enter your academic year'],
  },
  enrollment: {
    type: String,
    required: [true, 'please enter your enrollment no.'],
  },
  branch: {
    type: String,
    required: [true, 'please enter your branch name.'],
  },
  college: {
    type: String,
    required: [true, 'please enter your branch name.'],
  },
  orderId: {
    type: String,
  },
  paymentId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  referedBy: {
    type: String,
  },
  meanOfSource: {
    type: String,
  },
});

const EventBooking = mongoose.model('EventBooking', eventBookingSchema);
module.exports = EventBooking;
