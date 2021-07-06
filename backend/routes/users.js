const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUser } = require('../controllers/users');
const { getUsers } = require('../controllers/users');
const { updateProfile } = require('../controllers/users');
const { updateAvatar } = require('../controllers/users');
const { getUserInfo } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/me', auth, celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required(),
  }),
}), getUserInfo);

router.get('/', auth, getUsers);

router.get('/:userId', auth, celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUser);

router.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^(http|https):\/\/[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/),
  }),
}), updateAvatar);

module.exports = router;
