const express = require('express');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const customers = require('./routes/customers');
const app = express();

const uri =
  'mongodb+srv://root:root@cluster0.vosid.mongodb.net/vidly?retryWrites=true&w=majority';

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Could not connect to MongoDB', err));

mongoose.set('useFindAndModify', false);

app.use(express.json());
app.use('/api/genres/', genres);
app.use('/api/movies/', movies);
app.use('/api/customers/', customers);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
