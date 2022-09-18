/* eslint-disable object-curly-newline */
const Card = require('../models/card');

const getCard = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
  const { name, link, owner = req.user._id } = req.body;

  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      res.status(400);
      res.send({ message: error });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('Карточка не найдена'))
    .then((card) => res.status(200).send(card))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('Карточка не найдена'))
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  getCard, createCard, deleteCard, likeCard, dislikeCard,
};
