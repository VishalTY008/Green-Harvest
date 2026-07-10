const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Crop name required'], trim: true },
  category: { type: String, required: true, enum: ['cereals', 'vegetables', 'fruits', 'pulses', 'oilseeds', 'cash-crops'] },
  description: { type: String, required: true },
  image: { type: String, required: true },
  season: { type: String, required: true },
  growingPeriod: { type: String, default: '' },
  soilType: { type: String, default: '' },
  waterRequirement: { type: String, default: '' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Crop', cropSchema);
