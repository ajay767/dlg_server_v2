const express = require('express');
const testController = require('./../controllers/testController');

const router = express.Router();

router
  .route('/')
  .get(testController.getDoc)
  .post(testController.createDoc)
  .patch(testController.updateDoc);

module.exports = router;
