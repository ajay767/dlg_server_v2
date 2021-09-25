const AppError = require('../utils/appError');
const Quiz = require('../models/quizModel');
const Score = require('../models/scoreModel');
const mongoose = require('mongoose');

exports.createQuiz = async (req, res, next) => {
  try {
    const {
      title,
      questions,
      description,
      startAt,
      endAt,
      duration,
    } = req.body;

    console.log(req.body);

    const quiz = await Quiz.create({
      title,
      questions,
      description,
      startAt,
      endAt,
      duration,
    });

    res.status(201).json({
      status: 'OK',
      quiz,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.find();
    res.status(200).json({
      status: 'ok',
      quiz,
    });
  } catch (err) {
    next(err);
  }
};
exports.getQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findOne({ _id: req.params.id });
    res.status(200).json({
      status: 'ok',
      quiz,
    });
  } catch (err) {
    next(err);
  }
};

exports.getLatestQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.find().sort('-createdAt');
    const latestQuiz = quiz.length ? quiz[0] : { status: 'not found' };
    res.status(200).json({
      status: 'ok',
      quiz: latestQuiz,
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteAllQuiz = async (req, res, next) => {
  try {
    await Quiz.deleteMany();
    res.status(200).json({
      status: 'ok',
    });
  } catch (err) {
    next(err);
  }
};

exports.getQuizResult = async (req, res, next) => {
  try {
    const scores = await Score.find({
      quiz: mongoose.Types.ObjectId('614d72503ccc9b0004e511c2'),
    });

    const scoreData = scores.map((data) => ({
      name: data.name,
      email: data.email,
      score: data.score,
      scoreInPerCent: data.scoreInPerCent,
      quiz: data.quiz,
    }));

    res.xls('score.xlsx', scoreData);
  } catch (error) {
    next(error);
  }
};
