const request = require('request');

const geocode = (address, callback) => {
  const mapboxKey = process.env.GEOCODE_API_KEY;
  const limit = 1;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxKey}&limit=${limit}`;

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to location service');
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search');
    } else {
      const data = body.features[0];
      callback(undefined, {
        longitude: data.center[0],
        latitude: data.center[1],
        location: data.place_name,
      });
    }
  });
}

module.exports = geocode;
