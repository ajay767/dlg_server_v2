const mongoose = require('mongoose');

const quizModel = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A Quiz must have a title'],
  },
  questions: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Question',
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 4,
      message: 'A Quiz Must have 4  questions',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

quizModel.pre('save', function(next) {
  this.populate({
    path: 'questions',
    select: 'question options',
  });
  next();
});
quizModel.pre(/^find/, function(next) {
  this.populate({
    path: 'questions',
  });
  next();
});
const Quiz = mongoose.model('Quiz', quizModel);
module.exports = Quiz;
