const Score = require('../models/scoreModel');
const Quiz = require('../models/quizModel');
const Question = require('../models/questionModel');

exports.createScore = async (req, res, next) => {
  try {
    const { name, email, answers, quiz } = req.body;
    const questions = await Question.find({}).select('+options.correct');
    const filteredQuestions = questions.filter((curr) => curr._id in answers);

    let score = 0;
    filteredQuestions.forEach((curr) => {
      let correctOpt;
      curr.options.forEach((opt) => {
        if (opt.correct) {
          correctOpt = opt._id;
          return;
        }
      });

      if (answers[curr._id] == correctOpt) {
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
