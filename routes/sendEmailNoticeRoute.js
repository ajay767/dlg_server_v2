const express = require('express');
const sendEmailNoticeController = require('./../controllers/sendEmailNoticeController');

const router = express.Router();

router.route('/').get(sendEmailNoticeController.sendEmailNotice);

module.exports = router;
