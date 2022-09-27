const User = require('../models/user');
const STATUS_CODE = require('../utils/statusCode');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

const getUser = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(STATUS_CODE.serverError).send({ message: 'Произошла ошибка' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(STATUS_CODE.notFound).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(STATUS_CODE.dataError).send({ message: 'Переданы некорректные данные при запросе пользователей' });
      } else {
        res.status(STATUS_CODE.serverError).send({ message: 'Произошла ошибка' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
  .then(hash => User.create({
	name,
    about,
    avatar,
	email,
	password: hash, // записываем хеш в базу
  }))   
  .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(STATUS_CODE.dataError).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else {
        res.status(STATUS_CODE.serverError).send({ message: 'Произошла ошибка' });
      }
    });
};

const login = (req, res) => {
	const { email, password } = req.body;
  
	User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        // хеши не совпали — отклоняем промис
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      // аутентификация успешна
      res.send({ message: 'Всё верно!' });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
  };

const updateUser = (req, res) => {
  const { name, about, _id = req.user._id } = req.body;

  User.findByIdAndUpdate(_id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      throw new Error('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(STATUS_CODE.dataError).send({ message: 'Переданы некорректные данные' });
      } else if (error.message === 'Пользователь не найден') {
        res.status(STATUS_CODE.notFound).send(error.message);
      } else {
        res.status(STATUS_CODE.serverError).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar, _id = req.user._id } = req.body;

  User.findByIdAndUpdate(_id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      throw new Error('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(STATUS_CODE.dataError).send({ message: 'Переданы некорректные данные' });
      } else if (error.message === 'Пользователь не найден') {
        res.status(STATUS_CODE.notFound);
      } else {
        res.status(STATUS_CODE.serverError).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

module.exports = {
  getUser, getUserById, createUser, updateUser, updateAvatar, login,
};
