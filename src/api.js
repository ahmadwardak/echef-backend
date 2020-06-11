"use strict";
const express = require('express');

const config = require('./config/config');
const bodyParser = require('body-parser');

const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const middlewares = require('./middlewares/middlewares');

const auth = require('./routes/authRoute');

const api = express();


// Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));

api.use(middlewares.allowCrossDomainRequests);
api.use(cors());


// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'eChef Backend'
    });
});

let server = require('http').createServer(api).listen(parseInt(config.socketPort), () => {
    console.log(`Socket.io is running in port ${config.socketPort}`);
});
require('./routes/socket.js').initialize(server);

// API routes
api.use('/auth', auth);

//Static files
api.use('/', express.static('public'));

module.exports = api;