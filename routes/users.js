const router = require('express').Router();

const { createUsers } = require('../controllers/users');

router.post('/', createUsers);

module.exports = router;
