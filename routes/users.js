const router = require('express').Router();

const { createUser } = require('../controllers/users');

// router.get('/users', createUser);

// router.get('/users/:userId', createUser);

router.post('/users', createUser);

// В каждом роуте понадобится _id пользователя, совершающего операцию. req.user._id

// router.patch('/users/me', createUser);

// router.patch('/users/me/avater', createUser);

module.exports = router;
