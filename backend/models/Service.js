const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title required'], trim: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'leaf' },
  image: { type: String, default: '' },
  features: [{ type: String }],
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
