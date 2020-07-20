const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');
const fetch = require('node-fetch')
const app = express();


require('dotenv').config();
require('./config/database');


const usersRoutes = require('./routes/users');

app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
const token = process.env.TOKEN

// API routes

app.use('/api/users', usersRoutes);


app.use(require('./config/auth'))

app.get('/allFlights', checkAuth, async(req, res) => {
    const apiUrl = `https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/${token}/latest.json`
    const response = await fetch(apiUrl)
    const json = await response.json();
    res.send(json)
})

function checkAuth(req, res, next) {
    if(req.user) return next();
    return res.status(501).json({msg: 'Not Authorized'});
}

//Single coordinate response
//https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/${token}/latest.json

https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/03ZdLebSI9FRTkq88eKSqvWMRHFA5cqQf/message.json

// 172   &icao24=A647D7

// Catch all
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Express app running on port ${port}`)
});

// app.get('/allFlights', async(req, res) => {
//     const apiUrl = `https://${token}@opensky-network.org/api/flights/aircraft?icao24=3c675a&begin=1517184000&end=1517270400"`
//     const response = await fetch(apiUrl)
//     const json = await response.json();
//     res.send(json)
// })