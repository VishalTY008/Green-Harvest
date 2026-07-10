const Analytics = require('../models/Analytics');
const catchAsync = require('../utils/catchAsync');

exports.getDashboard = catchAsync(async (req, res) => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const pageViews = await Analytics.aggregate([
    { $match: { date: { $gte: thirtyDaysAgo } } },
    { $group: { _id: '$page', totalViews: { $sum: '$views' } } },
    { $sort: { totalViews: -1 } },
  ]);

  const dailyViews = await Analytics.aggregate([
    { $match: { date: { $gte: thirtyDaysAgo } } },
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }, views: { $sum: '$views' } } },
    { $sort: { _id: 1 } },
  ]);

  const totalViews = pageViews.reduce((acc, p) => acc + p.totalViews, 0);

  res.json({ success: true, dashboard: { pageViews, dailyViews, totalViews } });
});

exports.trackPage = catchAsync(async (req, res) => {
  const { page } = req.body;
  if (!page || typeof page !== 'string') return res.status(400).json({ success: false, message: 'Page is required' });
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await Analytics.findOneAndUpdate(
    { page, date: today },
    { $inc: { views: 1 } },
    { upsert: true }
  );

  res.json({ success: true });
});
