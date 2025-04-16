const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Comment = require('../models/Comment');
const UserInteraction = require('../models/UserInteraction');

router.post('/', auth, async (req, res) => {
  try {
    const { solution, text } = req.body;
    const comment = await Comment.create({
      user: req.user.id,
      solution,
      text,
    });
    await UserInteraction.create({
      userId: req.user.id,
      solution,
      action: 'comment',
    });
    const populatedComment = await Comment.findById(comment._id).populate('user', 'username');
    res.status(201).json({
      id: populatedComment._id,
      user: populatedComment.user.username,
      text: populatedComment.text,
      created_at: populatedComment.createdAt,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;