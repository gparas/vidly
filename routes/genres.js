const express = require('express');
const router = express.Router();
const Genre = require('../models/genre');
const U = require('./utils');

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('the requested id does not exist');

  res.send(genre);
});

router.post('/', async (req, res) => {
  const { error } = U.validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const { error } = U.validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
  });

  if (!genre) return res.status(404).send('the requested id does not exist');

  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findOneAndRemove(req.params.id);

  if (!genre) return res.status(404).send('the requested id does not exist');

  res.send(genre);
});

module.exports = router;
