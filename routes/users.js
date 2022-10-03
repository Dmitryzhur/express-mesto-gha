const routerUser = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser, getUserById, getCurrentUser, updateUser, updateAvatar, login,
} = require('../controllers/users');

routerUser.get('/users', getUser);

routerUser.get('/users/me', getCurrentUser);

routerUser.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUserById);

routerUser.post('/users/me', login);

routerUser.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

routerUser.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/https?:\/\/(\w{3}\.)?[1-9a-z\-.]{1,}\.\w{2,}(\/[1-90a-z-._~:?#[@!$&'()*+,;=]{1,}\/?)?#?/i),
  }),
}), updateAvatar);

module.exports = routerUser;
