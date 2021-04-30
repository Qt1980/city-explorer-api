'use strict';
const superagent = require('superagent');//importing superagent into movies.js


app.get('/movies', getMovies)

function getMovies(request, response) {
    const url = 'https://api.themoviedb.org/3/search/movie/'
    let queryObject = {
        //put query in as key value pair (key: value)
        api_key: process.env.MOVIE_KEY_API,
        query: request.query.city
    }
    superagent
    .get(url)
    .query(queryObject)
    .then(movieResults => {
        response.send(movieResults.body.results.map(
            film => new Movie(film)
            ))
        })
}
    
function Movie(film) {
  this.title = film.title;
  this.overview = film.overview;
}
    
//node syntax for what is being exported

//this is how to export from movies.js into server.js
module.exports = getMovies;