const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const SALT_ROUNDS = 10;
const NotFoundError = require('../errors/not-found-err');

function getUsers(req, res, next) {
  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
}

function getUser(req, res, next) {
  return User.findOne({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send(user);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        const err = new Error('Переданы некорректные данные');
        err.statusCode = 400;
        next(err);
      }
      next(e);
    });
}

function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        const err = new Error('Данная почта уже используется');
        err.statusCode = 409;
        throw err;
      } return bcrypt.hash(password, SALT_ROUNDS);
    })
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => res.status(200).send({
      data: {
        name, about, avatar, email,
      },
    }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        const err = new Error('Некорректные данные');
        err.statusCode = 400;
        next(err);
      }
      next(e);
    });
}

function updateProfile(req, res, next) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      runValidators: true,
      new: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send({ data: user });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        const err = new Error('Переданы некорректные данные');
        err.statusCode = 400;
        next(err);
      }
      next(e);
    });
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      runValidators: true,
      new: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send({ data: user });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        const err = new Error('Переданы некорректные данные');
        err.statusCode = 400;
        next(err);
      }
      next(e);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    const err = new Error('Email или пароль не могут быть пустыми');
    err.statusCode = 400;
    next(err);
  }
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        const err = new Error('Пользователь не найден');
        err.statusCode = 403;
        next(err);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => { // eslint-disable-line
          if (!matched) {
            const err = new Error('Неправильные почта или пароль');
            err.statusCode = 401;
            next(err);
          } else {
            const token = jwt.sign({ _id: user._id }, '60c602f6dda3c7daf710dde1', { expiresIn: '7d' });
            return res.status(200).send({ token, message: 'Всё верно!' });
          }
        });
    })
    .catch(next);
}

function getUserInfo(req, res, next) {
  User.findById(req.user._id)
    .orFail(new Error('PageNotFound'))
    .then((user) => res.status(200).send(user))
    .catch((e) => {
      if (e.message === 'PageNotFound') {
        const err = new Error('Пользователь не найден');
        err.statusCode = 404;
        next(err);
      }
      if (e.name === 'CastError') {
        const err = new Error('Переданы некорректные данные');
        err.statusCode = 400;
        next(err);
      }
      next(e);
    });
}

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getUserInfo,
};
