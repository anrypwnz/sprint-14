const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send(user))
    .catch((e) => res.status(400).send(e));
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

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ err: err.message });
    });
};
