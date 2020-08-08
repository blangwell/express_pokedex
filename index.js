require('dotenv').config();
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000;

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
// public or static, use public because of public dir
app.use(express.static('public')) 

// GET - main index of site
// pull pokemon from API via axios request axios.get()
// await the response and render teh index.ejs file
// with a param of an object with the key pokemon and a value
// that calls pokemon.slice() on the response.data.reesults
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
app.use('/pokemon', require('./routes/pokemon'));

const server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = server;
