const Score = require('../models/scoreModel');
const Quiz = require('../models/quizModel');
const Question = require('../models/questionModel');
const AppError = require('../utils/appError');
const path = require('path');
const ExcelJs = require('exceljs');
exports.createScore = async (req, res, next) => {
  try {
    const { name, email, answers, quiz } = req.body;
    const questions = await Question.find({}).select('+options.correct');
    // Array of objects
    const map1 = new Map();
    const map2 = new Map(Object.entries(answers));
    await questions.map(async (question) => {
      let correct = '';
      question.options.map((option) => {
        if (option.correct) {
          correct = option._id;
        }
      });
      map1.set(question._id.toString(), correct.toString());
    });
    let score = 0;
    await Object.keys(answers).map((questionId, index) => {
      console.log(map1.get(questionId));
      console.log(map2.get(questionId));
      if (map2.get(questionId) == map1.get(questionId)) {
        score += 1;
      }
    });
    const scoreInPerCent = (score * 100) / Object.keys(answers).length;
    const newScore = await Score.create({
      name,
      email,
      score,
      scoreInPerCent,
      quiz,
    });
    res.status(201).json({
      status: 'ok',
      newScore,
    });
  } catch (err) {
    next(err);
  }
};

exports.sendQuizScore = async (req, res, next) => {
  try {
    const scores = await Score.find({
      quiz: req.params.id,
    });
    let count = 0;
    const scoreData = scores.map((data) => {
      count += 1;
      return {
        serial_no: count,
        name: data.name,
        email: data.email,
        score: data.score,
        scoreInPerCent: data.scoreInPerCent,
        quiz: data.quiz,
      };
    });
    res.xls('score.xlsx', scoreData);
  } catch (err) {
    next(err);
  }
};
