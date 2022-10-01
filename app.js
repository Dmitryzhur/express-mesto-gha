const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const routerCards = require('./routes/cards');
const routerUser = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, async (err) => {
  if (err) throw err;
});

app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUser);
app.use((req, res, next) => {
  req.user = {
    _id: '632365b1861bd8afa8d6c6da', // вставьте сюда _id созданного в предыдущем пункте пользователя
	// user: ,
	// password: ,
  };

  next();
});
app.use(auth);
app.use('/', routerUser);
app.use('/', routerCards);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.listen(PORT);
