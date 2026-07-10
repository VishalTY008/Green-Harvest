const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: { type: String, required: [true, 'Question required'], trim: true },
  answer: { type: String, required: [true, 'Answer required'] },
  category: { type: String, default: 'general', enum: ['general', 'farming', 'products', 'services', 'shipping'] },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('FAQ', faqSchema);
