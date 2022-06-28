const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

const router = require('express').Router();

router.get('/movies', (req, res, next) => {
    Movie.find()
    .then((response) => {
        res.render('../views/movies/movies.hbs', { response });
    })
    .catch((error) => {
        next(error);
    })
});

router.get('/movies/create', (req, res, next) => {
    Celebrity.find()  
    .then((response) => {
        res.render('../views/movies/new-movie.hbs', { response });
    })
    .catch((error) => {
        next(error);
    })
});
  
router.post('/movies/create', (req, res, next) => {
    Movie.create({
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast
    })
    .then(() => {
        res.redirect('/movies')
    })
    .catch(() => {
        res.render('../views/movies/new-movie.hbs')
    })
});

router.get('/movies/:id', (req, res, next) => {
    Movie.findById(req.params.id)
    .populate('cast')
    .then((response) => {
        res.render('../views/movies/movie-details.hbs', { response });
    })
    .catch((error) => {
        next(error);
    })
});

router.get('/movies/:id/edit', (req, res, next) => {
    Movie.findById(req.params.id)
    Celebrity.find()
    .then((response) => {
        console.log(response)
        res.render('../views/movies/edit-movie.hbs', { response });
    })
    .catch((error) => {
        next(error);
    })
});

router.post('/movies/:id/edit', (req, res, next) => {
    Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast
    })
    .then(() => {
        res.redirect("/movies");
    })
    .catch(() => {
        res.render('../views/movies/update-form.hbs');
    })
});

router.post('/movies/:id/delete', (req, res, next) => {
    Movie.findByIdAndRemove(req.params.id)
    .then(() => {
        res.redirect("/movies");
    })
    .catch((error) => {
        next(error);
    })
});

module.exports = router;