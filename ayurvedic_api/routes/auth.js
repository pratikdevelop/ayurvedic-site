const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UserProfile = require('../models/UserProfile');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const profile = await UserProfile.findOne({ user: user._id }) || await UserProfile.create({ user: user._id });
    const accessToken = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    res.json({
      user: { id: user._id, username: user.username, isPremium: profile.isPremium, healthConcerns: profile.healthConcerns },
      access: accessToken,
      refresh: refreshToken,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    if (await User.findOne({ username })) {
      return res.status(400).json({ error: 'Username already taken' });
    }
    const user = await User.create({ username, email, password });
    const profile = await UserProfile.create({ user: user._id });
    const accessToken = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      user: { id: user._id, username: user.username, isPremium: profile.isPremium, healthConcerns: profile.healthConcerns },
      access: accessToken,
      refresh: refreshToken,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/refresh', async (req, res) => {
  const { refresh } = req.body;
  if (!refresh) {
    return res.status(400).json({ error: 'Refresh token required' });
  }
  try {
    const decoded = jwt.verify(refresh, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }
    const accessToken = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ access: accessToken });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
});

router.post('/logout', (req, res) => {
  // In a real app, blacklist refresh token in a database
  res.json({ message: 'Logout successful' });
});

module.exports = router;