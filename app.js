const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Слушаем 3000 порт
// const { PORT = 3000 } = process.env;
const routerUsers = require('./routes/users');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb',
  async (err) => {
    if (err) throw err;
    console.log("conncted to db");
  },
);

app.use(bodyParser.json());

app.use('/users', routerUsers);

app.listen(3000, () => {
  console.log('Сервер запущен');
});
