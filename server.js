const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');
const fetch = require('node-fetch')
const app = express();


require('dotenv').config();
require('./config/database');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const usersRoutes = require('./routes/users');

app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
const token = process.env.TOKEN

// API routes

app.use('/api/users', usersRoutes);



app.get('/allFlights', async(req, res) => {
    const apiUrl = `https://${token}@opensky-network.org/api/flights/all?begin=1517227200&end=1517230800&icao24=A647D7` 
    const response = await fetch(apiUrl)
    const json = await response.json();
    res.send(json)
})

// 172   &icao24=A647D7

app.use(require('./config/auth'))

// Catch all
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Express app running on port ${port}`)
});