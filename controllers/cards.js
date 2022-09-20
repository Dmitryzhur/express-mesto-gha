const Card = require('../models/card');
const STATUS_CODE = require('../utils/statusCode');

const getCard = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((error) => res.status(STATUS_CODE.serverError).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
  const { name, link, owner = req.user._id } = req.body;

  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(STATUS_CODE.dataError).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(STATUS_CODE.serverError).send({ message: 'Произошла ошибка' });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(STATUS_CODE.notFound).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(STATUS_CODE.dataError).send({ message: 'Карточка с указанным _id не найдена' });
      } else {
        res.status(STATUS_CODE.serverError).send({ message: 'Произошла ошибка' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(STATUS_CODE.notFound).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(STATUS_CODE.dataError).send({ message: 'Переданы некорректные данные для постановки лайка' });
      } else {
        res.status(STATUS_CODE.serverError).send({ message: 'Произошла ошибка' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(STATUS_CODE.notFound).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(STATUS_CODE.dataError).send({ message: 'Переданы некорректные данные для снятия лайка' });
      } else {
        res.status(STATUS_CODE.serverError).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports = {
  getCard, createCard, deleteCard, likeCard, dislikeCard,
};
