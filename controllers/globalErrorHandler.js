module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err.code === 11000) {
    if (err.keyValue.enrollment) {
      err.message = `${err.keyValue.enrollment} is already used!`;
    }

    if (err.keyValue.email) {
      err.message = `${err.keyValue.email} is already used!`;
    }
  }
  return res.status(err.statusCode).json({
    title: 'Something went wrong!',
    message: err.message,
  });
};
