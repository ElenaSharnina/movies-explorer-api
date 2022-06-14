const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
// const ConflictError = require('../errors/conflict-error');
// const NotFoundError = require('../errors/not-found-error');
// const UnauthorizedError = require('../errors/unauthorized-error');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, mail } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, mail },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      // upsert: true, // если пользователь не найден, он будет создан
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else next(err);
    });
};
