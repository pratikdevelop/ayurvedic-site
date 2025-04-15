const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const UserProfile = require('../models/UserProfile');
const Solution = require('../models/Solution');
const UserInteraction = require('../models/UserInteraction');

router.post('/:solutionId', auth, async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.solutionId);
    if (!solution) {
      return res.status(404).json({ error: 'Solution not found' });
    }
    const profile = await UserProfile.findOne({ user: req.user.id });
    if (!profile.favoriteSolutions.includes(solution._id)) {
      profile.favoriteSolutions.push(solution._id);
      await profile.save();
      await UserInteraction.create({
        userId: req.user.id,
        solution: solution._id,
        action: 'favorite',
      });
    }
    res.json({ message: 'Solution favorited' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:solutionId', auth, async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.solutionId);
    if (!solution) {
      return res.status(404).json({ error: 'Solution not found' });
    }
    const profile = await UserProfile.findOne({ user: req.user.id });
    profile.favoriteSolutions = profile.favoriteSolutions.filter(id => id.toString() !== solution._id.toString());
    await profile.save();
    res.json({ message: 'Solution unfavorited' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;