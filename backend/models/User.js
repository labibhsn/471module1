const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  category: { type: String, enum: ['regular', 'premium', 'admin'], default: 'regular' },
  isSuspended: { type: Boolean, default: false },
  warnings: [{ message: String, date: Date }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
