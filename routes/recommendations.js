const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Solution = require('../models/Solution');
const UserProfile = require('../models/UserProfile');
const { recommendSolution } = require('../utils/rlAgent');

router.get('/:userId', auth, async (req, res) => {
  if (req.user.id !== req.params.userId) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const profile = await UserProfile.findOne({ user: req.user.id });
    const solution = await recommendSolution(req.user.id, profile?.healthConcerns || []);
    if (!solution) {
      return res.status(404).json({ message: 'No solutions available yet' });
    }
    const populatedSolution = await Solution.findById(solution._id)
      .populate('categories')
      .populate('user', 'username');
    res.json({
      id: populatedSolution._id,
      solution_id: populatedSolution.solutionId,
      title: populatedSolution.title,
      description: populatedSolution.description,
      date: populatedSolution.date,
      is_premium: populatedSolution.isPremium,
      categories: populatedSolution.categories,
      user: populatedSolution.user,
      favorited: profile?.favoriteSolutions.includes(populatedSolution._id) || false,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;