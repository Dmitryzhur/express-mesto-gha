const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const routerCards = require('./routes/cards');
const routerUser = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const getDefaultError = require('./middlewares/getDefaultError');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, async (err) => {
  if (err) throw err;
});

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/', routerUser);
app.use('/', routerCards);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.use(errors());
app.use(getDefaultError);

app.listen(PORT);
