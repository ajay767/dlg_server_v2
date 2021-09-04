const mongoose = require('mongoose');
const AcademicsSubject = require('./academicsSubjectModel');

const notesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Document must have name.'],
  },
  subjectCode: {
    type: String,
    required: [true, 'Please provide the subject code!'],
  },
  semester: {
    type: Number,
    required: [true, 'Please provide semester.'],
  },
  branch: {
    type: String,
    required: [true, 'Please provide branch name.'],
  },
  subject: {
    type: String,
    required: [true, 'Please provide subject name.'],
  },
  year: {
    type: Number,
    required: [true, 'Please provide academic year.'],
  },
  uploadedAt: {
    type: Date,
    default: Date.now(),
  },
  tags: {
    type: [String],
  },
  document: {
    type: String,
    required: [true, 'Document link must be available!'],
  },
});

const AcademicsNote = mongoose.model('AcademicsNote', notesSchema);

module.exports = AcademicsNote;
