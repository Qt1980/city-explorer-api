'use strict';

//BACK END SERVER
const cors = require('cors');

const express = require('express'); //This line of code is how we import express into the server.
const app = express();
app.use(cors());

const superagent = require('superagent');

require('dotenv').config();
// const weatherData = require('./data/weather.json');
const PORT = process.env.PORT || 3001;

const axios = require('axios');

app.get('/', (request, response) => {
    response.send('You got it Qadree!');
});

app.get('/weather', async (request, response) => {
    // console.log(request.query)
      try {
        const weatherResponse = await superagent.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${request.query.lat}&lon=${request.query.lon}&key=${process.env.WEATHER_API_KEY}`)
        // console.log(weatherResponse.data)
        // const dailyForecasts  = weatherData.data.map(day => new Forecast(day));
        console.log('here', weatherResponse.body)
        const dailyForecasts = await weatherResponse.body.data.map(day => new Forecast(day));
        console.log(dailyForecasts, 'this is back end data')
        response.send(dailyForecasts);
        // response.send(weatherResponse.data)
    } catch (error) {
        handleErrors(error, response);
    }
});

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

function Forecast(obj) {
    this.date = obj.datetime;
    this.description = obj.weather.description;
}

function Movie(film) {
    this.title = film.title;
    this.overview = film.overview;
}

function handleErrors (error, response) {
    response.status(500).send('Internal Error');
}

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));