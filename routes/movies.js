const movieRouter = require('express').Router();
const bodyParser = require('body-parser');

const {
  getSaveMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

movieRouter.use(bodyParser.json());
movieRouter.use(bodyParser.urlencoded({ extended: true }));

movieRouter.get('/', getSaveMovies);
movieRouter.post('/', createMovie);
movieRouter.delete('/:movieId', deleteMovie);

module.exports = movieRouter;
