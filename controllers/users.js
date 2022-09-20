const User = require('../models/user');
const STATUS_CODE = require('../utils/statusCode');

const getUser = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((error) => res.status(STATUS_CODE.serverError).send({ message: 'Произошла ошибка' }));
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
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
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
  getUser, getUserById, createUser, updateUser, updateAvatar,
};
