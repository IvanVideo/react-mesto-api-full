const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const NoRightsError = require('../errors/no-register-error');

function getCards(req, res, next) {
  console.log('00000');
  return Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        const err = new Error('Переданы некорректные данные');
        err.statusCode = 400;
        next(err);
      }
    });
}

function daleteCard(req, res, next) {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (String(card.owner) !== String(req.user._id)) {
        throw new NoRightsError('Вы не можете удалять чужие карточки');
      }
      Card.deleteOne({ _id: card._id })
        .then(() => {
          res.status(200).send({ message: 'Карточка удалена' });
        });
    })
    .catch(next);
}

function putLike(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.status(200).send({ data: card });
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

function deleteLike(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.status(200).send({ data: card });
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

module.exports = {
  getCards,
  createCard,
  daleteCard,
  putLike,
  deleteLike,
};
