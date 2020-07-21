const jwt = require('jsonwebtoken');
const Card = require('../models/card.js');

module.exports.getCard = (req, res) => {
  Card.find({})
    .then((data) => res.send({ data }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.delCard = async (req, res) => {
  const token = req.headers.authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
    const card = await Card.findById(req.params.id);
    if (card == null) {
      res.status(404).send('Карточка не найдена');
    // eslint-disable-next-line eqeqeq
    } else if (payload._id == card.owner) {
      card.remove();
      res.status(200).send({ 'deleted_card': card });
    } else {
      res.status(403).send('У вас нет прав на удаление этой карточки');
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

module.exports.createCard = async (req, res) => {
  const {
    name, link,
  } = req.body;
  await Card.create({
    name, link, owner: req.user._id, likes: [],
  })
    .then((data) => res.send({ data }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
