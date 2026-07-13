const Testimonial = require('../models/Testimonial');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAll = catchAsync(async (req, res) => {
  const filter = req.query.all === 'true' ? {} : { featured: true };
  const testimonials = await Testimonial.find(filter).sort('order');
  res.json({ success: true, testimonials });
});

exports.getOne = catchAsync(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) throw new AppError('Testimonial not found', 404);
  res.json({ success: true, testimonial });
});

exports.create = catchAsync(async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  res.status(201).json({ success: true, testimonial });
});

exports.update = catchAsync(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!testimonial) throw new AppError('Testimonial not found', 404);
  res.json({ success: true, testimonial });
});

exports.remove = catchAsync(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) throw new AppError('Testimonial not found', 404);
  res.json({ success: true, message: 'Testimonial deleted' });
});
