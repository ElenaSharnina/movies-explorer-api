const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const bodyParser = require('body-parser');
const regexLink = require('../utils/constants');

const {
  getSaveMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

movieRouter.use(bodyParser.json());
movieRouter.use(bodyParser.urlencoded({ extended: true }));

movieRouter.get('/', getSaveMovies);
movieRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regexLink),
    trailerLink: Joi.string().required().pattern(regexLink),
    thumbnail: Joi.string().required().pattern(regexLink),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);
movieRouter.delete('/:movieId', deleteMovie);

module.exports = movieRouter;
