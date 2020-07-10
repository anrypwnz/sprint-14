const router = require('express').Router();
const bodyParser = require('body-parser');
const { createUser, getUser, getUsers } = require('../controller/users');

router.use(bodyParser.json());
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);

module.exports = router;
