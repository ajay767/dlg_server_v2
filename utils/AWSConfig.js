const AWS = require("aws-sdk");

const AWS_CONFIG = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

module.exports = AWS_CONFIG;
