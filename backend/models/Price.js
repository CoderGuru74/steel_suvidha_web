const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
  item: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  change: { type: Number, default: 0 },
  up: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Price', PriceSchema);