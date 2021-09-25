const express = require('express');
const questionController = require('../controllers/questionController');
const authController = require('../controllers/authController');
const quizController = require('../controllers/quizController');
const scoreController = require('../controllers/scoreController');
const router = express.Router();

router.post(
  '/create-question',
  authController.protect,
  questionController.createQuestion
);

router.get('/get-all-questions', questionController.getAllQuestions);
router.delete('/delete-all-questions', questionController.deleteAllQuestions);
router.delete(
  '/delete-question/:id',
  authController.protect,
  questionController.deleteQuestion
);

router.post('/create-quiz', authController.protect, quizController.createQuiz);
router.get('/get-all-quiz', quizController.getAllQuiz);
router.get('/get-quiz/:id', quizController.getQuiz);
router.get('/get-latest-quiz', quizController.getLatestQuiz);
router.delete('/delete-all-quiz', quizController.deleteAllQuiz);

router.post('/submit', scoreController.createScore);
router.get('/send-quiz-score/:id', scoreController.sendQuizScore);
module.exports = router;
