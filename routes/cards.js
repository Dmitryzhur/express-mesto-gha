const router = require('express').Router();

const {
  getCard, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCard);

router.post('/cards', createCard);

router.delete('/cards/:userId', deleteCard);

router.put('/cards/:userId/likes', likeCard);

router.delete('/cards/:userId/likes', dislikeCard);

module.exports = router;
