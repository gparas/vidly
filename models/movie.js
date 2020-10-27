const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

// Schemas
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 5, maxlength: 50 },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    default: 0,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 255,
  },
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0),
    dailyRentalRate: Joi.number().min(0),
  });
  return schema.validate(movie);
}

module.exports = {
  Movie,
  validateMovie,
};
