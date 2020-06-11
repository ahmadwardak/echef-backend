"use strict";

//Configuration Middleware - Variables:
const port = process.env.PORT || '3000';
const socketPort = '3001';

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/echefdb';

const JwtSecret = process.env.JWT_SECRET || 'Secret0fEcH3f';

module.exports = {
    port,
    socketPort,
    mongoURI,
    JwtSecret,
};