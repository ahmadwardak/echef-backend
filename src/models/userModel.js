"use strict";

const mongoose = require('mongoose');
const accounttypes = ["customer", "chef"];
const subscriptiontypes = ["normal", "premium", "none"];
// User Account Scheme
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
    loyaltyScore: {
        type: Number,
        default: 0,
        min: 0,
        max: 99999
    },
    paymentOption: {
        type: String,
        enum: ['visa', 'mastercard', 'paypal', 'none'],
        required: true
    },
    accountType: {
        type: String,
        enum: accounttypes,
        required: true
    },
    address: {
        type: String
    },
    billingAddress: {
        type: String
    },
    shippingAddress: {
        type: String
    },
    subscriptionType: {
        type: String,
        enum: subscriptiontypes,
        required: true,
        default: 'normal'
    }
});

UserSchema.set('versionKey', false);

module.exports = {
    UserModel: mongoose.model('User', UserSchema),
    accounttypes,
    subscriptiontypes
}