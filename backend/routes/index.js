const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const users = require('./users');
const cards = require('./cards');
const { createUser } = require('../controllers/users');
const { login } = require('../controllers/users');

router.use('/users', users);
router.use('/cards', cards);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^(http|https):\/\/[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);
router.use('*', (req, res, next) => {
  const err = new Error('Страница не найдена');
  err.statusCode = 404;
  next(err);
});

module.exports = router;
