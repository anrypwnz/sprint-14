const Card = require('../models/card.js');

module.exports.getCard = (req, res) => {
  Card.find({})
    .then((data) => res.send({ data }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.delCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.id);
    if (card == null) {
      res.status(404).send('Card not found');
    } else {
      res.status(200).send({ 'deleted_card': card });
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
