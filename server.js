'use strict';

//BACK END SERVER
//server.js still has the job of tying everything together.
//needs to still have most of the 'requires'
//setup the port
//app.get/app.use
//app.listen

//get handlers from their own files
//this is how we import using router from weather and movies.js into the server
const weatherRouter = require('./handlers/weather');
const movieRouter = require('./handlers/movies');
//--------------------LINE SEPARATION----------------------------

const cors = require('cors');
const express = require('express'); //This line of code is how we import express into the server.

const app = express();
app.use(cors());

require('dotenv').config();
// const weatherData = require('./data/weather.json');
const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
    response.send('You got it Qadree!');
});
app.use(weatherRouter);//this is how to use the router.get. This gives access to router.get in the movie and weather.js files.
app.use(movieRouter);

//Moved the weather code below to it's own file.

// app.get('/weather', async (request, response) => {
//     // console.log(request.query)
//       try {
//         const weatherResponse = await superagent.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${request.query.lat}&lon=${request.query.lon}&key=${process.env.WEATHER_API_KEY}`)
//         // console.log(weatherResponse.data)
//         // const dailyForecasts  = weatherData.data.map(day => new Forecast(day));
//         console.log('here', weatherResponse.body)
//         const dailyForecasts = await weatherResponse.body.data.map(day => new Forecast(day));
//         console.log(dailyForecasts, 'this is back end data')
//         response.send(dailyForecasts);
//         // response.send(weatherResponse.data)
//     } catch (error) {
//         handleErrors(error, response);
//     }
// });

//Moved the movie code below to it's own file.

// app.get('/movies', getMovies)

// function getMovies(request, response) {
//     const url = 'https://api.themoviedb.org/3/search/movie/'
//     let queryObject = {
//         //put query in as key value pair (key: value)
//         api_key: process.env.MOVIE_KEY_API,
//         query: request.query.city
//     }
//     superagent
//         .get(url)
//         .query(queryObject)
//         .then(movieResults => {
//             response.send(movieResults.body.results.map(
//                 film => new Movie(film)
//             ))
//         })
// }

function handleErrors (error, response) {
    response.status(500).send('Internal Error');
}

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));