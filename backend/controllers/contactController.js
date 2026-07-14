const Contact = require('../models/Contact');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { sendEmail, contactNotificationEmail } = require('../utils/email');

exports.submit = catchAsync(async (req, res) => {
  const contact = await Contact.create(req.body);
  sendEmail({
    to: process.env.EMAIL_USER,
    subject: `New Contact Inquiry: ${req.body.subject}`,
    html: contactNotificationEmail(req.body),
  }).catch(() => {});
  res.status(201).json({ success: true, message: 'Message sent successfully' });
});

exports.getAll = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.read === 'true') filter.isRead = true;
  else if (req.query.read === 'false') filter.isRead = false;
  const features = new APIFeatures(Contact.find(filter), req.query).sort().paginate();
  const inquiries = await features.query;
  const total = await Contact.countDocuments(filter);
  const unread = await Contact.countDocuments({ ...filter, isRead: false });
  res.json({ success: true, count: inquiries.length, total, unread, inquiries });
});

exports.markRead = catchAsync(async (req, res) => {
  const inquiry = await Contact.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
  if (!inquiry) throw new AppError('Inquiry not found', 404);
  res.json({ success: true, inquiry });
});

exports.remove = catchAsync(async (req, res) => {
  const inquiry = await Contact.findByIdAndDelete(req.params.id);
  if (!inquiry) throw new AppError('Inquiry not found', 404);
  res.json({ success: true, message: 'Inquiry deleted' });
});
