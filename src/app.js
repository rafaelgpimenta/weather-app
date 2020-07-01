require('dotenv').config();

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const pubDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handleBars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(pubDirectoryPath));

app.get('/', (_req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Rafael'
  });
});

app.get('/about', (_req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Rafael'
  });
});

app.get('/help', (_req, res) => {
  res.render('help', {
    helpText: 'Helpful text',
    title: 'Help',
    name: 'Rafael'
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'You must provide an address'
    });
  }

  geocode(address, (error, {latitude, longitude, location} = {}) => {
    if (error) return res.send({ error });

    forecast(latitude, longitude, (forecastError, forecastData) => {
      if (forecastError) return res.send({ error: forecastError });

      res.send({
        location,
        forecast: forecastData,
        address: address,
      });
    });
  });

});

app.get('/help/*', (_req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found',
    title: '404',
    name: 'Rafael'
  });
});

app.get('*', (_req, res) => {
  res.render('404', {
    errorMessage: 'Page not found',
    title: '404',
    name: 'Rafael'
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
