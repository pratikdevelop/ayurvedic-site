const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const UserProfile = require('../models/UserProfile');

router.get('/', auth, async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ user: req.user.id }).populate('favoriteSolutions');
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json({
      user_id: req.user.id,
      username: req.user.username,
      is_premium: profile.isPremium,
      health_concerns: profile.healthConcerns,
      favorite_solutions: profile.favoriteSolutions,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { health_concerns, paypal_subscription_id } = req.body;
    let profile = await UserProfile.findOne({ user: req.user.id });
    if (!profile) {
      profile = await UserProfile.create({ user: req.user.id });
    }
    if (health_concerns) profile.healthConcerns = health_concerns;
    if (paypal_subscription_id) {
      profile.isPremium = true;
      profile.paypalSubscriptionId = paypal_subscription_id;
    }
    await profile.save();
    res.json({
      user_id: req.user.id,
      username: req.user.username,
      is_premium: profile.isPremium,
      health_concerns: profile.healthConcerns,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;