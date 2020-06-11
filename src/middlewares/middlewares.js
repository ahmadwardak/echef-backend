"use strict";

const jwt = require('jsonwebtoken');
const config = require('../config/config');

const allowCrossDomainRequests = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
};


const checkAuthentication = (req, res, next) => {

    // check header or url parameters or post parameters for token
    let token = ""
    if (req.headers.authorization) {
        token = req.headers.authorization.substring(4);
    }

    if (!token)
        return res.status(401).send({
            error: 'Unauthorized',
            message: 'No token provided in the request'
        });

    // verifies secret and checks exp
    jwt.verify(token, config.JwtSecret, (err, decoded) => {
        if (err) return res.status(401).send({
            error: 'Unauthorized',
            message: 'Failed to authenticate token.'
        });

        // if everything is good, save to request for use in other routes
        req.userID = decoded._id;
        next();
    });


};

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    res.sendStatus(500);
    res.render('error', { error: err })
};


module.exports = {
    allowCrossDomainRequests,
    checkAuthentication,
    errorHandler
};