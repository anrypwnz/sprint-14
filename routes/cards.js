const router = require('express').Router();
const bodyParser = require('body-parser');
const { createCard, getCard, delCard } = require('../controller/cards');

router.use(bodyParser.json());
router.get('/cards', getCard);
router.delete('/cards/:id', delCard);
router.post('/cards', createCard);

module.exports = router;
