/* eslint-disable object-curly-newline */
const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link, owner, likes, createdAt } = req.body;
  Card.create({ name, link, owner, likes, createdAt })
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      res.status(400);
      res.send({ message: error });
    });
};

module.exports = {
  createCard,
};

module.exports.createCard = (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req.user._id); // _id станет доступен
};
