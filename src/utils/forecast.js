const request = require('request');

const forecast = (lat, lon, callback) => {
  const access_key = process.env.FORECAST_API_KEY;
  const query = `${lat},${lon}`;
  const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${query}`

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service');
    } else if (body.error) {
      callback('Unable to find location');
    } else {
      const {current: data} = body;
      callback(
        undefined,
        `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`
      );
    }
  });
}


module.exports = forecast;
