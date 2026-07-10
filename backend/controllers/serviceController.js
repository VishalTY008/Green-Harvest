const Service = require('../models/Service');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAll = catchAsync(async (req, res) => {
  const services = await Service.find({ active: true }).sort('order');
  res.json({ success: true, services });
});

exports.getOne = catchAsync(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) throw new AppError('Service not found', 404);
  res.json({ success: true, service });
});

exports.create = catchAsync(async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json({ success: true, service });
});

exports.update = catchAsync(async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!service) throw new AppError('Service not found', 404);
  res.json({ success: true, service });
});

exports.remove = catchAsync(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) throw new AppError('Service not found', 404);
  res.json({ success: true, message: 'Service deleted' });
});
