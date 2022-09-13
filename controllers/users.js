const User = require('../models/user');

const createUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      res.status(400);
      res.send({ message: error });
    });
};

module.exports = {
  createUsers,
};
