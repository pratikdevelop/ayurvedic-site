const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const UserInteraction = require('../models/UserInteraction');
const { updateAgent } = require('../utils/rlAgent');

router.get('/', auth, async (req, res) => {
  try {
    const interactions = await UserInteraction.find({ userId: req.user.id }).populate('solution');
    res.json(interactions);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { solution, action, rating } = req.body;
    const interaction = await UserInteraction.create({
      userId: req.user.id,
      solution,
      action,
      rating,
    });
    await updateAgent(req.user.id, solution, action, rating);
    res.status(201).json(interaction);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;