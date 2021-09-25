const mongoose = require('mongoose');
const validator = require('validator');

const scoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Enter Your Name'],
    },
    email: {
      type: String,
      required: [true, 'Please Provide a Valid Email'],
      validate: {
        validator: (email) => {
          return validator.isEmail(email);
        },
        message: 'Email is not valid!',
      },
    },
    score: {
      type: Number,
      default: 0,
    },
    scoreInPerCent: {
      type: Number,
      default: 0,
    },
    quiz: {
      type: mongoose.Schema.ObjectId,
      ref: 'Quiz',
      required: [true, 'A Score Should belong to a Quiz'],
    },
  },
  {
    timestamps: true,
  }
);

scoreSchema.index({ quiz: 1, email: 1 }, { unique: true });

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
