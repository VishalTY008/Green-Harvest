const Blog = require('../models/Blog');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAll = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.published === 'true') filter.published = true;
  else if (req.query.published === 'false') filter.published = false;
  else filter.published = true;
  const features = new APIFeatures(Blog.find(filter), req.query).search(['title', 'content', 'excerpt']).sort().paginate();
  const blogs = await features.query;
  const total = await Blog.countDocuments(filter);
  res.json({ success: true, count: blogs.length, total, blogs });
});

exports.getOne = catchAsync(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog) throw new AppError('Blog not found', 404);
  res.json({ success: true, blog });
});

exports.getById = catchAsync(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new AppError('Blog not found', 404);
  res.json({ success: true, blog });
});

exports.create = catchAsync(async (req, res) => {
  const blog = await Blog.create(req.body);
  res.status(201).json({ success: true, blog });
});

exports.update = catchAsync(async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!blog) throw new AppError('Blog not found', 404);
  res.json({ success: true, blog });
});

exports.remove = catchAsync(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) throw new AppError('Blog not found', 404);
  res.json({ success: true, message: 'Blog deleted' });
});
