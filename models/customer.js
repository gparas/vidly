const mongoose = require('mongoose');

// Schemas
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  phone: String,
  isGold: { type: Boolean, default: false },
});

// Models
module.exports = mongoose.model('Customer', customerSchema);
