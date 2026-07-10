const Crop = require('../models/Crop');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAll = catchAsync(async (req, res) => {
  const features = new APIFeatures(Crop.find(), req.query).filter().search(['name', 'description']).sort().paginate();
  const crops = await features.query;
  const total = await Crop.countDocuments();
  res.json({ success: true, count: crops.length, total, crops });
});

exports.getOne = catchAsync(async (req, res) => {
  const crop = await Crop.findById(req.params.id);
  if (!crop) throw new AppError('Crop not found', 404);
  res.json({ success: true, crop });
});

exports.create = catchAsync(async (req, res) => {
  const crop = await Crop.create(req.body);
  res.status(201).json({ success: true, crop });
});

exports.update = catchAsync(async (req, res) => {
  const crop = await Crop.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!crop) throw new AppError('Crop not found', 404);
  res.json({ success: true, crop });
});

exports.remove = catchAsync(async (req, res) => {
  const crop = await Crop.findByIdAndDelete(req.params.id);
  if (!crop) throw new AppError('Crop not found', 404);
  res.json({ success: true, message: 'Crop deleted' });
});
