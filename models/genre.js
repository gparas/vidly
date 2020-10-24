const mongoose = require('mongoose');

// Schemas
const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
});

// Models
module.exports = mongoose.model('Genre', genreSchema);
