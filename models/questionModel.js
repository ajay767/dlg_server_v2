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
      validator: (v) => Array.isArray(v) && v.length === 4,
      message: 'A Quiz must have atleast 4 options',
    },
  },
});

const Question = mongoose.model('Question', questionModel);
module.exports = Question;
