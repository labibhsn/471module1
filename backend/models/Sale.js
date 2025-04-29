const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  auction: { type: mongoose.Schema.Types.ObjectId, ref: 'Auction', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  saleDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Sale', SaleSchema);
