const express = require('express');
const upload = require('../utils/multer');
const fileUploadController = require('../controllers/fileUploadController');
const router = express.Router();

router.post('/', upload.single('file'), fileUploadController);

module.exports = router;
