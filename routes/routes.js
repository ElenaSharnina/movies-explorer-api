const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRoute = require('./users');
const movieRoute = require('./movies');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-error');
const { validationUserCreate, validationLogin } = require('../validator/validator');

router.post('/signup', validationUserCreate, createUser);

router.post('/signin', validationLogin, login);

router.use('/users', auth, userRoute);
router.use('/movies', auth, movieRoute);

router.use('/*', auth, () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
