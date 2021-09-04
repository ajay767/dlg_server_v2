const express = require('express');
const authController = require('./../controllers/authController');
const eventController = require('./../controllers/eventController');

const router = express.Router();

router.route('/').get(eventController.getEvents);
router.route('/:id').get(eventController.getEventByID);

router.use(authController.protect);

router.route('/').post(eventController.createEvent);

module.exports = router;
