const express = require('express');
const authController = require('../controllers/authController');
const academicsController = require('../controllers/academicsController');

const router = express.Router();
router.route('/subjects').get(academicsController.getSubjects);
router.route('/:code').get(academicsController.getDocuments);

// router.use(authController.protect);
// router
//   .route('/')
//   .post(fileUploader.uploadFilesToAWS, academicsController.upload);

module.exports = router;
