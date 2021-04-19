'use strict';
const cors = require('cors');
//BACK END SERVER
// const { response } = require('express'); 

const express = require('express'); //This line of code is how we import express into the server.
require('dotenv').config();
const weatherData = require('./data/weather.json');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
console.log(weatherData);

app.get('/', (request, response) => {
    response.send('Hello, You got it!');
});

app.get('/weather', (request, response) => {
      try {
        const dailyForecasts  = weatherData.data.map(day => new Forecast(day));
        response.send(dailyForecasts);
    } catch (error) {
        handleErrors(error, response);
    }
});

function Forecast(obj) {
    this.date = obj.datetime;
    this.description = obj.weather.description;
}

function handleErrors (error, response) {
    response.status(500).send('Internal Error');
}

// app.get('/', (request, response) => {
//     response.json(lat)
// })
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
// const cors = require('cors';

// const superagent = require('superagent');

// const app = express();

// const corsOptions = {
//     origin: function (origin, callback) {
//         callback(null, true);
//     }
// };