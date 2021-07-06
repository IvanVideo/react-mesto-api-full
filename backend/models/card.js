const mongoose = require('mongoose');

const validateAvatar = /^(http|https):\/\/[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validateAvatar.test(v),
      message: 'Недопустимое значение поля avatar',
    },
  },
  owner: {
    type: Object,
    required: true,
    ref: 'user',
  },
  likes: {
    type: Object,
    default: [],
    ref: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
