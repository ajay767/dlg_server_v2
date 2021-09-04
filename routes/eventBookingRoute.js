const express = require('express');
const emailController = require('./../controllers/emailController');
const authController = require('./../controllers/authController');
const eventBookingController = require('./../controllers/eventBookingController');

const router = express.Router();

router.route('/create-session').post(eventBookingController.createBooking);
// router.route('/').get(eventBookingController.getAllUser);
// router.route('/confirm/:id').get(eventBookingController.register);
// router.route('/create').post(eventBookingController.createBooking);
router
  .route('/checkout')
  .post(eventBookingController.confirmBooking, emailController.sendFile);

router.use(authController.protect);
router.route('/').get(eventBookingController.getUser);

module.exports = router;
