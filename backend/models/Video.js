const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: 'Verified Infrastructure Ledger Node Log' },
  videoUrl: { type: String, required: true },
  duration: { type: String, default: '02:45' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Video', VideoSchema);