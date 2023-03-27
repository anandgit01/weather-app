const express = require('express');
const ejs = require('ejs');
const request = require('request');
const axios = require('axios');
const app = express();

// Set up EJS view engine
app.set('view engine', 'ejs');

// Define route for weather search form
app.get('/', function(req, res) {
  res.render('index');
});


// Handle form submission and weather API request
app.get('/weather', function(req, res) {
    const city = req.query.city;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m`;
    
    axios.get(url)
      .then(response => {
        const data = response.data;
        res.render('weather', { data });
      })
      .catch(error => {
        console.log(error);
        res.render('error');
      });
  });
  

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
});
