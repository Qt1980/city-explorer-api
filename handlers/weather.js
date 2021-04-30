'use strict';

const axios = require('axios');//importing axios into weather.js

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

function Forecast(obj) {
  this.date = obj.datetime;
  this.description = obj.weather.description;
}

//this is how to export from weather.js into server.js
module.exports = weatherResponse; 