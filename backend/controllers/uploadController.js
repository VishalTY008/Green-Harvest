const catchAsync = require('../utils/catchAsync');

exports.uploadImage = catchAsync(async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  res.json({ success: true, url: `${baseUrl}/uploads/${req.file.filename}` });
});

exports.uploadMultiple = catchAsync(async (req, res) => {
  if (!req.files?.length) return res.status(400).json({ success: false, message: 'No files uploaded' });
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const urls = req.files.map(f => `${baseUrl}/uploads/${f.filename}`);
  res.json({ success: true, urls });
});
