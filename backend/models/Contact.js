const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name required'], trim: true },
  email: { type: String, required: [true, 'Email required'], lowercase: true },
  subject: { type: String, required: [true, 'Subject required'] },
  message: { type: String, required: [true, 'Message required'] },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
