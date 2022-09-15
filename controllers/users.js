const User = require('../models/user');

const getUser = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUserById = (req, res) => {
  User.findById(req.params._id)
    .then(user => res.send(user))
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

};

const updateAvatar = (req, res) => {

};

module.exports = {
  getUser, getUserById, createUser, updateUser, updateAvatar,
};
