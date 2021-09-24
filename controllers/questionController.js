const AppError = require('../utils/appError');
const Question = require('../models/questionModel');

exports.createQuestion = async (req, res, next) => {
  try {
    let { question, options } = req.body;

    let correctOptionPresent = false;

    options.forEach((option) => {
      if (option.correct === true) {
        correctOptionPresent = true;
      }
    });

    if (!correctOptionPresent) {
      return next(
        new AppError('Please Provide atleast one correct option', 400)
      );
    }
    const finalQuestion = await Question.create({
      question,
      options,
    });
    res.status(201).json({
      status: 'success',
      finalQuestion,
    });
  } catch (err) {
    next(err);
  }
};
exports.getAllQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find();
    res.status(200).json({
      status: 'ok',
      questions,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteQuestion = async (req, res, next) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'ok',
    });
  } catch (err) {
    next(err);
  }
};

/* Hidden API ONLY ACCESSED TO SUPER ADMINS */
exports.deleteAllQuestions = async (req, res, next) => {
  try {
    await Question.deleteMany();
    res.status(200).json({
      status: 'ok',
    });
  } catch (err) {
    next(err);
  }
};
