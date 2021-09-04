const express = require('express');
const emailController = require('./../controllers/emailController');
const recruitmentController = require('./../controllers/recruitmentController');

const router = express.Router();

router
  .route('/')
  .post(recruitmentController.createRecruitment, emailController.sendMail)
  .get(recruitmentController.getRecruitment);
// .patch(recruitmentController.updateAllDocument);

router.route('/search').post(recruitmentController.getUserByEmailandEnrollment);

router
  .route('/:id/:type')
  // .patch(recruitmentController.deleteRecruitment)
  .patch(recruitmentController.updateRecruitment);

router
  .route('/filter/:type/:year')
  .get(recruitmentController.getFilteredRecruitment);
module.exports = router;
