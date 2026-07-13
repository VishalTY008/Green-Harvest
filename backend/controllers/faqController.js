const FAQ = require('../models/FAQ');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAll = catchAsync(async (req, res) => {
  const filter = req.query.all === 'true' ? {} : { active: true };
  const faqs = await FAQ.find(filter).sort('order');
  res.json({ success: true, faqs });
});

exports.getOne = catchAsync(async (req, res) => {
  const faq = await FAQ.findById(req.params.id);
  if (!faq) throw new AppError('FAQ not found', 404);
  res.json({ success: true, faq });
});

exports.create = catchAsync(async (req, res) => {
  const faq = await FAQ.create(req.body);
  res.status(201).json({ success: true, faq });
});

exports.update = catchAsync(async (req, res) => {
  const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!faq) throw new AppError('FAQ not found', 404);
  res.json({ success: true, faq });
});

exports.remove = catchAsync(async (req, res) => {
  const faq = await FAQ.findByIdAndDelete(req.params.id);
  if (!faq) throw new AppError('FAQ not found', 404);
  res.json({ success: true, message: 'FAQ deleted' });
});
