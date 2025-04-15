const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  isPremium: { type: Boolean, default: false },
  paypalSubscriptionId: { type: String },
  healthConcerns: { type: [String], default: [] },
  favoriteSolutions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Solution' }],
});

module.exports = mongoose.model('UserProfile', userProfileSchema);