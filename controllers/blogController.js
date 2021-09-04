const Blog = require('../models/blogModel');

exports.createBlog = async (req, res, next) => {
  try {
    const { title, description, body, tags, author, poster } = req.body;
    const blog = await Blog.create({
      title,
      description,
      body,
      tags,
      poster,
      author,
    });
    res.status(201).json({
      status: 'success',
      blog,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllBlog = async (req, res, next) => {
  try {
    const blog = await Blog.find();
    res.status(200).json({
      status: 'success',
      blog,
    });
  } catch (err) {
    next(err);
  }
};

exports.getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      blog,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: false,
    });
    res.status(200).json({
      status: 'success',
      blog,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};

exports.uploadImage = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.status(201).json({
      status: 'success',
      url: result.secure_url,
      id: result.public_id,
    });
  } catch (err) {
    next(err);
  }
};
