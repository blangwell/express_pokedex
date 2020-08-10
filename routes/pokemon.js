const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  // TODO: Get all records from the DB and render to view
  // await models to be required, then pokemon model to be required
  // transitioning from api data to db data
  const getPokemon = await db.pokemon.findAll();
  res.render('favorites', {pokemon: getPokemon});
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  // TODO: Get form data and add a new record to DB
  // post the data we GET from index to the pokemon database
  await db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(p => {
    console.log('created: ', p.name)
  })
  res.redirect('/pokemon')
});

router.get('/:id', async (req, res) => {
  // to access the parameters at /:id
  let pokeID = req.params.id;
  // const getPokemon = await db.pokemon.findAll();
  let pokeURL = `http://pokeapi.co/api/v2/pokemon/${pokeID}`
  axios.get(pokeURL).then(response => { 
    let pokemon= response.data;
    res.render('show', {pokemon: pokemon})
  }).catch(err => {
    console.log(err);
  })
})

// delete route
// router.get('/delete/:id', async (req, res) => {
//   let pokeID = req.params.id;
//   await db.pokemon.destroy({
//     where: {
//       name: pokeID
//     }
//   }).then(p => {
//     console.log('destroyed: ', pokeID);
//     res.redirect('/');
//   }).catch(err => {
//     console.log('error occurred : ', err);
//   })
// })

// need to use method override
router.delete('/:id', async (req, res) => {
   await db.pokemon.destroy({
    where: {
      name: req.params.id
    }
  }).then(response => {
    res.redirect('/pokemon')
  }).catch(err => {
    res.render('error')
  })
})

module.exports = router;
