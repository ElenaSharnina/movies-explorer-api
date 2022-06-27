const movieRouter = require('express').Router();
const bodyParser = require('body-parser');
const {
  getSaveMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const { validationMovieCreate, validationMovieDelete } = require('../validator/validator');

movieRouter.use(bodyParser.json());
movieRouter.use(bodyParser.urlencoded({ extended: true }));

movieRouter.get('/', getSaveMovies);

movieRouter.post('/', validationMovieCreate, createMovie);

movieRouter.delete('/:movieId', validationMovieDelete, deleteMovie);

module.exports = movieRouter;
