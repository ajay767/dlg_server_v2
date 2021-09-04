const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A Blog must have a title'],
    },
    poster: {
      type: String,
      required: [true, 'A blog must have a poster'],
    },
    description: {
      type: String,
      required: [true, 'A Blog must have a description'],
    },
    body: String,
    tags: {
      type: [String],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'A Blog must have atleast one tag',
      },
    },
    author: {
      type: String,
      required: [true, 'A Blog must have a author'],
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
