const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Product name required'], trim: true },
  price: { type: Number, required: [true, 'Price required'], min: 0 },
  category: { type: String, required: true, enum: ['seeds', 'fertilizers', 'equipment', 'pesticides', 'organic', 'other'] },
  description: { type: String, required: true },
  images: [{ type: String }],
  stock: { type: Number, required: true, min: 0, default: 0 },
  unit: { type: String, default: 'kg' },
  ratings: { type: Number, default: 0, min: 0, max: 5 },
  numReviews: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'inactive', 'pending'], default: 'active' },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
