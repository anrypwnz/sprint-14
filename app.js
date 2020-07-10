const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cards = require('./routes/cards.js');
const users = require('./routes/users.js');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('### successful connection to db');
});
mongoose.connection.on('error', (err) => {
  console.log('### error', err);
  process.exit(1);
});

app.use((req, res, next) => {
  req.user = {
    _id: '5f02ce1cd6f2bb4c3ca41cb0',
  };
  next();
});
app.use(cards);
app.use(users);
app.all('*', (req, res, next) => {
  res.status(404).send({ 'message': 'Запрашиваемый ресурс не найден' });
  next();
});

app.listen(PORT);
