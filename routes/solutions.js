const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Solution = require('../models/Solution');
const UserInteraction = require('../models/UserInteraction');
const UserProfile = require('../models/UserProfile');

router.get('/', auth, async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ user: req.user.id });
    const query = profile?.isPremium ? {} : { isPremium: false };
    const solutions = await Solution.find(query)
      .populate('categories')
      .populate('user', 'username')
      .sort('-date');
    res.json(solutions.map(s => ({
      id: s._id,
      solution_id: s.solutionId,
      title: s.title,
      description: s.description,
      date: s.date,
      is_premium: s.isPremium,
      affiliate_link: s.affiliateLink,
      categories: s.categories,
      user: s.user,
      favorited: profile?.favoriteSolutions.includes(s._id) || false,
    })));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, description, solutionId = `AS${Date.now()}`, categories = [] } = req.body;
    const solution = await Solution.create({
      solutionId,
      title,
      description,
      user: req.user.id,
      categories,
    });
    await UserInteraction.create({
      userId: req.user.id,
      solution: solution._id,
      action: 'submit',
    });
    const populatedSolution = await Solution.findById(solution._id).populate('categories').populate('user', 'username');
    res.status(201).json({
      id: populatedSolution._id,
      solution_id: populatedSolution.solutionId,
      title: populatedSolution.title,
      description: populatedSolution.description,
      date: populatedSolution.date,
      is_premium: populatedSolution.isPremium,
      categories: populatedSolution.categories,
      user: populatedSolution.user,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;