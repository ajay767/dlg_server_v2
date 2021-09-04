const AppError = require('../utils/appError');
const AWSupload = require('./s3_AWS_Bucket');
const AcademicsNote = require('../models/academicsNotesModel');
const AcademicsSubject = require('../models/academicsSubjectModel');

exports.upload = async (req, res, next) => {
  try {
    const isSubjectPresent = await AcademicsSubject.findOne({
      subjectCode: req.body.subjectCode,
    });

    /*if our subjectModel do not have subjectCode of current document
    we'll add it to our subjectModel.*/
    if (!isSubjectPresent) {
      AcademicsSubject.create({
        subjectCode: req.body.subjectCode,
        subjectName: req.body.subject,
      });
    }

    const tags = req.body.tags.split(',');

    const document = await AcademicsNote.create({
      name: req.body.fileName,
      subjectCode: req.body.subjectCode,
      semester: req.body.semester,
      subject: req.body.subject,
      document: req.body.document,
      uploadedAt: req.body.upload,
      tags,
      branch: req.body.branch,
      year: req.body.year,
    });

    res.status(200).json({
      status: 'Success',
      message: 'success',
      document,
    });
  } catch (error) {
    AWSupload.deleteFilesFromAWS(req.body.fileName, process.env.AWS_BUCKET);
    next(new AppError('Failed to upload file', 500));
  }
};

exports.getSubjects = async (req, res, next) => {
  try {
    const data = await AcademicsSubject.find({});
    res.status(200).json({
      status: 'success',
      documents: data,
    });
  } catch (error) {
    return next(new AppError(404, 'Some error occured!'));
  }
};

exports.getDocuments = async (req, res, next) => {
  try {
    const data = await AcademicsNote.find({
      subjectCode: req.params.code,
    });
    res.status(200).json({
      status: 'success',
      documents: data,
    });
  } catch (error) {
    return next(new AppError(404, 'Some error occured!'));
  }
};
