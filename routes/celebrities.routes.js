const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
      .then((response) => {
      res.render('../views/celebrities/celebrities.hbs', {response})
      })
      .catch((error) => {
        next(error);
      })
  });

router.get('/celebrities/create', (req, res, next) => {
    Celebrity.create()  
      .then(() => {
        res.render('../views/celebrities/new-celebrity.hbs')
      })
      .catch((error) => {
        next(error);
      })
  });
  
  router.post('/celebrities/create', (req, res, next) => {
    Celebrity.create({
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.phrase
    })
      .then(() => {
        res.redirect('/celebrities')
      })
      .catch(() => {
        res.render('../views/celebrities/new-celebrity.hbs')
      })
  });

module.exports = router;