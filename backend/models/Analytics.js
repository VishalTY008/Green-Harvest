const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  page: { type: String, required: true },
  views: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  uniqueVisitors: { type: Number, default: 0 },
}, { timestamps: true });

analyticsSchema.index({ page: 1, date: 1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
