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

// i need more explaination here 
router.get('/:id', async (req, res) => {
  // to access /:name
  let pokeID = req.params.id;
  // const getPokemon = await db.pokemon.findAll();
  let pokeURL = `http://pokeapi.co/api/v2/pokemon/${pokeID}`
  axios.get(pokeURL).then(response => {
    let pokemon = response.data;
    console.log(pokemon); // this logs successfully!
    res.render('show', {pokemon: pokemon})
  }).catch(err => {
    console.log(err);
  })
})

router.get('/delete/:id', async (req, res) => {
  let pokeID = req.params.id;
  await db.pokemon.destroy({
    where: {
      name: pokeID.toString()
    }
  }).then(p => {
    console.log('destroyed: ', pokeID);
    res.redirect('/');
  }).catch(err => {
    console.log('error occurred : ', err);
  })
})


module.exports = router;
