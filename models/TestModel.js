const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  rejected: {
    type: Boolean,
  },
});

const TestModel = mongoose.model('Testing', testSchema);

module.exports = TestModel;
