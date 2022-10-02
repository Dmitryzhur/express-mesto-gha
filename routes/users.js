const routerUser = require('express').Router();

const {
  getUser, getUserById, getCurrentUser, updateUser, updateAvatar, login,
} = require('../controllers/users');

routerUser.get('/users', getUser);

routerUser.get('/users/me', getCurrentUser);

routerUser.get('/users/:userId', getUserById);

routerUser.post('/users/me', login);

routerUser.patch('/users/me', updateUser);

routerUser.patch('/users/me/avatar', updateAvatar);

module.exports = routerUser;
