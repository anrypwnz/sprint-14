const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: mongoose.Schema.Types.String,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    required: true,
    type: mongoose.Schema.Types.String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    required: true,
    type: mongoose.Schema.Types.String,
    validate: {
      validator(v) {
      // eslint-disable-next-line
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(v);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
