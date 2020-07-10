const User = require('../models/user.js');

module.exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const created = await User.create({ name, about, avatar });
    if (created) {
      res.send('created well');
    } else {
      res.status(500).send('create error');
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user != null) {
        res.send({ user });
      } else {
        res.status(404).send('Нет такого пользователя');
      }
    })
    .catch((err) => res.status(500).send({ err, message: 'Произошла ошибка' }));
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
};
