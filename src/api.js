"use strict";
const express = require('express');

const config = require('./config/config');
const bodyParser = require('body-parser');

const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const middlewares = require('./middlewares/middlewares');
const morgan = require('morgan');

const auth = require('./routes/authRoute');
const review = require('./routes/recipeReviewRoute');
const recipe = require('./routes/recipeRoute');

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

api.use(morgan('dev'));
// API routes
api.use('/auth', auth);
api.use('/reviews', review);
api.use('/recipe', recipe);


//Static files
api.use('/', express.static('public'));

//use morgan here to handle not found error for route not found..... 
api.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

api.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = api;