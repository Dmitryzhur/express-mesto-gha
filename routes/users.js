const routerUser = require('express').Router();

const {
  getUser, getUserById, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

routerUser.get('/users', getUser);

routerUser.get('/users/:userId', getUserById);

routerUser.post('/users', createUser);

routerUser.patch('/users/me', updateUser);

routerUser.patch('/users/me/avatar', updateAvatar);

module.exports = routerUser;
