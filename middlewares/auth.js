const jwt = require('jsonwebtoken');

const auth = (req, res, next, err) => {
  console.log('req.cookies =', req.cookies);
  const token = req.cookies.access_token;
  if (!token) {
    next(new Error('Необходима авторизация'));
    return;
  }
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new Error('Необходима авторизация'));
	return;
  }

  req.user = payload; // добавляем пейлоуд токена в объект запроса

  next(); // отправляем запрос дальше
};

module.exports = { auth };
