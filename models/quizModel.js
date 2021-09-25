const mongoose = require('mongoose');

const quizModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A Quiz must have a title'],
    },
    description: {
      type: String,
      required: [true, 'Please provide description of quiz'],
    },
    startAt: {
      type: Date,
      required: [true, 'Please provide start date'],
    },
    endAt: {
      type: Date,
      required: [true, 'Please provide end date'],
    },
    duration: {
      type: Number,
      required: [true, 'Please provide duration of quiz'],
    },
    questions: {
      type: [mongoose.Schema.ObjectId],
      ref: 'Question',
      validate: {
        validator: (v) => Array.isArray(v) && v.length >= 4,
        message: 'A Quiz Must have 4  questions',
      },
    },
  },
  { timestamps: true }
);

quizModel.pre('save', function(next) {
  this.populate({
    path: 'questions',
    select: 'question options',
  });
  next();
  // Populate
});

quizModel.pre(/^find/, function(next) {
  this.populate({
    path: 'questions',
  });
  next();
});

const Quiz = mongoose.model('Quiz', quizModel);
module.exports = Quiz;
