const mongoose = require('mongoose');

const AuctionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isSuspended: { type: Boolean, default: false },
  success: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Auction', AuctionSchema);
