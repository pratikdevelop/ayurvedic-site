const mongoose = require('mongoose');

const userInteractionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  solution: { type: mongoose.Schema.Types.ObjectId, ref: 'Solution', required: true },
  action: { type: String, required: true, enum: ['view', 'submit', 'favorite', 'comment', 'rate'] },
  rating: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserInteraction', userInteractionSchema);