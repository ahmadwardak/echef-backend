"use strict";

const mongoose = require('mongoose');

// User Account Scheme
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
});

UserSchema.set('versionKey', false);

module.exports = mongoose.model('User', UserSchema);