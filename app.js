const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const routerCard = require('./routes/cards');
const routerUser = require('./routes/users');

const app = express();

mongoose.connect(
  'mongodb://localhost:27017/mestodb',
  async (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log('conncted to db');
  },
);

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '632365b1861bd8afa8d6c6da', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use('/', routerUser);
app.use('/', routerCard);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен');
});
