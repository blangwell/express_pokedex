require('dotenv').config();
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const pokemon = require('./models/pokemon');
const app = express();
const router = express.Router();  
const port = process.env.PORT || 3000;

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
// public or static, use public because of public dir
app.use(express.static('public')) 

// GET - main index of site
// pull pokemon from API via axios request axios.get()
// await the response and render the index.ejs file
// with a param of an object with the key pokemon and a value
// that calls pokemon.slice() on the array returned from response.data.results
app.get('/', (req, res) => {
  let pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151>';
  // Use request to call the API
  axios.get(pokemonUrl).then(response => {
    console.log(response.data);
    let pokemon = response.data.results;
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  });
});

// Imports all routes from the pokemon routes file
// this is middleware that allows us to render from the routes dir
app.use('/pokemon', require('./routes/pokemon'));

router.get('/pokemon', (req, res) => {
  // let pokemon = 
  res.render('pokemon', {pokemon: pokemon.name})
})

const server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = server;
