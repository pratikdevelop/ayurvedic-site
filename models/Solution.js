const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
  solutionId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isPremium: { type: Boolean, default: false },
  affiliateLink: { type: String },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
});

module.exports = mongoose.model('Solution', solutionSchema);