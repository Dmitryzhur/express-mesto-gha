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
  
	User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

	  const token = jwt.sign({ _id: user._id }, 'secret-code', { expiresIn: '7d' });

      res
	  	.cookie('access_token', token, {
       	  httpOnly: true,
		})
        .send({ message: 'Аутентификация прошла успешно' });
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

const getCurrentUser = (req, res, next) => {
	User.findById(req.user._id)
	  .then((user) => {
		if (!user) {
		  next(new Error('Пользователь не найден'));
		}
		return res.status(200).send(user);
	  })
	  .catch(next);
  };

module.exports = {
  getUser, getUserById, createUser, updateUser, updateAvatar, login, getCurrentUser,
};
