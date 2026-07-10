const User = require('../models/User');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAll = catchAsync(async (req, res) => {
  const features = new APIFeatures(User.find(), req.query).sort().paginate();
  const users = await features.query;
  const total = await User.countDocuments();
  res.json({ success: true, count: users.length, total, users });
});

exports.updateRole = catchAsync(async (req, res) => {
  const { role } = req.body;
  if (!['user', 'admin'].includes(role)) throw new AppError('Invalid role', 400);
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
  if (!user) throw new AppError('User not found', 404);
  res.json({ success: true, user });
});

exports.remove = catchAsync(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw new AppError('User not found', 404);
  res.json({ success: true, message: 'User deleted' });
});
