/* eslint-disable object-curly-newline */
const Card = require('../models/card');

const getCard = (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

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

const deleteCard = (req, res) => {

};

const likeCard = (req, res) => {

};

const dislikeCard = (req, res) => {

};

module.exports = {
  getCard, createCard, deleteCard, likeCard, dislikeCard,
};

module.exports.createCard = (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req.user._id); // _id станет доступен
};
