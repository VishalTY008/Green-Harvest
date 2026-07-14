const User = require('../models/User');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { sendEmail, welcomeEmail } = require('../utils/email');

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.generateToken();
  const cookieOptions = {
    expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN || 7) * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };
  res.status(statusCode).cookie('token', token, cookieOptions).json({
    success: true,
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
  });
};

exports.register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) throw new AppError('Email already registered', 400);
  const user = await User.create({ name, email, password });
  sendEmail({
    to: email,
    subject: 'Welcome to GreenHarvest!',
    html: welcomeEmail(name),
  }).catch(() => {});
  sendTokenResponse(user, 201, res);
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new AppError('Email and password required', 400);
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) throw new AppError('Invalid credentials', 401);
  sendTokenResponse(user, 200, res);
});

exports.getMe = catchAsync(async (req, res) => {
  res.json({ success: true, user: req.user });
});

exports.logout = catchAsync(async (req, res) => {
  res.cookie('token', 'none', { expires: new Date(Date.now() + 5 * 1000), httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  res.json({ success: true, message: 'Logged out' });
});

exports.updatePassword = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id).select('+password');
  if (!(await user.comparePassword(req.body.currentPassword))) throw new AppError('Current password incorrect', 401);
  user.password = req.body.newPassword;
  await user.save();
  sendTokenResponse(user, 200, res);
});

exports.updateProfile = catchAsync(async (req, res) => {
  const { name, phone, address } = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, { name, phone, address }, { new: true, runValidators: true });
  res.json({ success: true, user });
});
