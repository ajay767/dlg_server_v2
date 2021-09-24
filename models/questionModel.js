const mongoose = require('mongoose');

const questionModel = new mongoose.Schema({
  question: {
    type: String,
    unique: true,
    required: [true, 'A Quiz Must Have Question'],
  },
  options: {
    type: [
      {
        option: String,
        correct: {
          type: Boolean,
          default: false,
          select: false,
        },
      },
    ],
    validate: {
      validator: (v) => Array.isArray(v) && v.length >= 2,
      message: 'A Quiz must have atleast 2 options',
    },
  },
});

const Question = mongoose.model('Question', questionModel);
module.exports = Question;
