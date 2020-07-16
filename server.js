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

// API routes

app.use('/api/users', usersRoutes);

// const params = {
//   access_key: '89fa0e334c3b82558f0734c319d171d5' 
// } 

app.get('/allFlights', async(req, res) => {
    const apiUrl = `https://tawlur:tylertyler@opensky-network.org/api/flights/all?begin=1517227200&end=1517230800` 
    const response = await fetch(apiUrl)
    const json = await response.json();
    res.send(json)
})

app.use(require('./config/auth'))

// Catch all
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Express app running on port ${port}`)
});