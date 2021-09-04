const AWS = require("aws-sdk");
const AppError = require("./../utils/appError");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

exports.uploadFileToAWS = async (bucket, key, file, req, res, next) => {
  const uploadParams = {
    Bucket: bucket,
    Key: key,
    Body: file,
  };
  console.log("process Start");

  const awsS3Promise = s3.upload(uploadParams).promise();
  awsS3Promise
    .then((result) => {
      console.log(result.Location);
      req.body.document = result.Location;
      next();
    })
    .catch((err) => {
      console.log("File uploading error!!");
      console.log(err);
      return next(new AppError("Error while uploading file!!", 404));
    });
};

exports.deleteFilesFromAWS = async (file, bucket, res) => {
  const params = {
    Bucket: bucket,
    Key: file,
  };

  const awsS3DeletePromise = s3.deleteObject(params).promise();
  awsS3DeletePromise
    .then((e) => {
      console.log("File deleted successfully.");
    })
    .catch((err) => {
      console.log("Error deleting file!");
    });
};

exports.loadAWSObjects = () => {
  s3.listObjects({ Bucket: "testbucket43521" }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      return data;
    }
  });
};
