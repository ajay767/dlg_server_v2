const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subjectCode: {
    type: String,
    unique: true,
  },
  subjectName: {
    type: String,
  },
});

const AcademicsSubject = mongoose.model('AcademicsSubject', subjectSchema);

module.exports = AcademicsSubject;
