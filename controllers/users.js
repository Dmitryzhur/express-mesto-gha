const User = require('../models/user');

const getUser = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      res.status(400).send({ message: error });
    });
};

const updateUser = (req, res) => {
  const { name, about, _id = req.params.userId } = req.body;

  User.findByIdAndUpdate(_id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch(err => res.status(500).send({ message: 'Данные не прошли валидацию. Либо произошло что-то совсем немыслимое' }));
};

const updateAvatar = (req, res) => {
  const { avatar, _id = req.params.userId } = req.body;

  User.findByIdAndUpdate(_id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch(err => res.status(500).send({ message: 'Данные не прошли валидацию. Либо произошло что-то совсем немыслимое' }));
};

module.exports = {
  getUser, getUserById, createUser, updateUser, updateAvatar,
};
