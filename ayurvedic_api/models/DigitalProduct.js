const mongoose = require('mongoose');

const digitalProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fileUrl: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('DigitalProduct', digitalProductSchema);