"use strict";
require('dotenv').config();
const port = process.env.PORT || '3000';

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://admin:masterkey@cluster0-ozdd2.mongodb.net/echef?retryWrites=true&w=majority';//'mongodb://localhost:27017/echefdb';

const JwtSecret = process.env.JWT_SECRET || 'Secret0fEcH3f';

module.exports = {
    port,
    mongoURI,
    JwtSecret,
};