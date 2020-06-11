"use strict";
const http = require('http');
const mongoose = require('mongoose');

const api = require('./src/api');
const config = require('./src/config/config');

// Set port for the API using the config middleware
api.set('port', config.port);

//HTTP Server using Express
const server = http.createServer(api);

//MongoDB Connection: Based on URL and PORT defined in config; 
mongoose
    .connect(config.mongoURI)
    .then(() => server.listen(config.port))
    .catch(err => {
        console.log('Unable to connect to the Database...', err.message);
        process.exit(err.statusCode);
    });

server.on('listening', () => {
    console.log(`Listening on port ${config.port} for API endpoints...`);
});

server.on('error', (err) => {
    console.log('Error in backend server...', err.message);
    process.exit(err.statusCode);
});