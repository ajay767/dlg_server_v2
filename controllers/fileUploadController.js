const { v4: uuidv4 } = require('uuid');
const AppError = require('../utils/appError');
const AWS_CONFIG = require('../utils/AWSConfig');
const cloudinary = require('../utils/cloudinary');

module.exports = async (req, res, next) => {
  try {
    if (req.query.destination === 'AWS') {
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: req.file.originalname,
        Body: req.file.buffer,
      };

      AWS_CONFIG.upload(params, (err, data) => {
        if (err) {
          return next(
            new AppError(
              'Internal Server Error ! Please try after some time',
              500
            )
          );
        }
        res.status(200).json({
          status: 'success',
          data,
        });
      });
      return;
    }

    if (!req.file.path) {
      return next(new AppError('No file found', 404));
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    res.status(201).json({
      status: 'success',
      url: result.secure_url,
      id: result.public_id,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
