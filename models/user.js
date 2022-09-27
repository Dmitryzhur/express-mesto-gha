const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isUrl = require('validator/lib/isUrl');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
	default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
	default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
	default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
	validate: {
		validator: (avatar) => isUrl(avatar),
		message: 'Avatar validation failed'
	  },
  },
  email: {
	type: String,
    required: true,
    unique: true,
	validate: {
		validator: (email) => isEmail(email),
		message: 'Email validation failed'
	  },
  },
  password: {
	type: String,
    required: true,
	select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
