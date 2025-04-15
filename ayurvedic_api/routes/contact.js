const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await ContactMessage.create({ name, email, message });
    res.status(201).json({ message: 'Message sent' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;