"use strict";
const express = require('express');

const config = require('./config/config');
const bodyParser = require('body-parser');

const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const middlewares = require('./middlewares/middlewares');

const auth = require('./routes/authRoute');
const review = require('./routes/recipeReviewRoute');
const ingredients = require('./routes/ingredientRoute');
// Morgan allows to log Http requests
const morgan = require('morgan');
morgan.token('body', (req, res) => {
    return "Body of request:" + JSON.stringify(req.body)// req.body.name + req.body.number
})
morgan.token('head', (req, res) => {
    return "Head of request:" + JSON.stringify(req.method)// req.body.name + req.body.number
})

const recipe = require('./routes/recipeRoute');
const category = require('./routes/categoryRoute');
const levels = require('./routes/difficultyLevels');
const order = require('./routes/orderRoute');
const shoppingCart = require('./routes/shoppingCartRoute');

const api = express();


// Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));

api.use(middlewares.allowCrossDomainRequests);
api.use(cors());


api.use(morgan(':method :url :status :res[content-length] - :response-time ms - :head - :body '))



// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'eChef Backend'
    });
});


let server = require('http').createServer(api).listen(parseInt(config.socketPort), () => {
    console.log(`Socket.io is running in port ${config.socketPort}`);
    console.log("Db connected at", config.mongoURI)
});
require('./routes/socket.js').initialize(server);

api.use(morgan('dev'));
// API routes
api.use('/auth', auth);
api.use('/reviews', review);
api.use('/ingredient', ingredients)
api.use('/ingredients', ingredients)
api.use('/recipe', recipe);
api.use('/recipes', recipe);
api.use('/categories', category);
api.use('/levels', levels);
api.use('/order', order);
api.use('/shoppingCart', shoppingCart);


//Static files
api.use('/', express.static('public'));
api.use('/public/uploads/reviews', express.static('public/uploads/reviews'));

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