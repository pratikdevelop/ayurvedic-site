const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const DigitalProduct = require('../models/DigitalProduct');
const Purchase = require('../models/Purchase');

router.get('/', auth, async (req, res) => {
  try {
    const products = await DigitalProduct.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/purchase', auth, async (req, res) => {
  try {
    const { product_id, paypal_transaction_id } = req.body;
    const product = await DigitalProduct.findById(product_id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await Purchase.create({
      user: req.user.id,
      product: product._id,
      paypalTransactionId: paypal_transaction_id,
    });
    res.json({ download_url: product.fileUrl });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;