const Product = require('../models/Product');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getMyProducts = catchAsync(async (req, res) => {
  const products = await Product.find({ seller: req.user.id }).sort('-createdAt');
  res.json({ success: true, count: products.length, products });
});

exports.createMyProduct = catchAsync(async (req, res) => {
  const product = await Product.create({ ...req.body, seller: req.user.id });
  res.status(201).json({ success: true, product });
});

exports.updateMyProduct = catchAsync(async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id, seller: req.user.id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!product) throw new AppError('Product not found or not yours', 404);
  res.json({ success: true, product });
});

exports.deleteMyProduct = catchAsync(async (req, res) => {
  const product = await Product.findOneAndDelete({ _id: req.params.id, seller: req.user.id });
  if (!product) throw new AppError('Product not found or not yours', 404);
  res.json({ success: true, message: 'Product deleted' });
});
