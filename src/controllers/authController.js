"use strict";

const config = require('../config/config');
const { UserModel, accounttypes, subscriptiontypes } = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
        error: 'Bad Request',
        message: 'Http request body must have username property'
    });
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'Http Request body must have password property'
    });

    UserModel.findOne({ username: req.body.username }).exec()
        .then(user => {

            // check password
            const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
            if (!isPasswordValid) return res.status(404).send({ error: 'Username or Password incorrect', token: null });

            // if user and password are valid then create a JWT TOKEN
            const token = jwt.sign({

                _id: user._id,
                username: user.username,
                email: user.email,
                address: user.address,
                billingaddress: user.billingAddress,
                shippingaddress: user.shippingAddress,
                accounttype: user.accountType,
                subscriptiontype: user.subscriptionType,
                fullname: user.fullName

            }, config.JwtSecret, {
                expiresIn: '24h'
            });

            res.status(200).json({ token: token });
        })
        .catch(error => res.status(404).json({
            error: 'Username or Password incorrect',
            message: error.message
        }));

};

const register = (req, res) => {

    if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
        error: 'Bad Request',
        message: 'Http request body must have username property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'fullName')) return res.status(400).json({
        error: 'Bad Request',
        message: 'Http request body must have fullName property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'Http request body must have password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) return res.status(400).json({
        error: 'Bad Request',
        message: 'Http request body must have email property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'accountType')) return res.status(400).json({
        error: 'Bad Request',
        message: 'Http request body must have accountType property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'paymentOption')) return res.status(400).json({
        error: 'Bad Request',
        message: 'Http request body must have paymentOption property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'address')) return res.status(400).json({
        error: 'Bad Request',
        message: 'Http request body must have address property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'billingAddress')) return res.status(400).json({
        error: 'Bad Request',
        message: 'Http request body must have billingAddress property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'shippingAddress')) return res.status(400).json({
        error: 'Bad Request',
        message: 'Http request body must have shippingAddress property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'subscriptionType')) return res.status(400).json({
        error: 'Bad Request',
        message: 'Http request body must have subscriptionType property'
    });

    const user = Object.assign(req.body, { password: bcrypt.hashSync(req.body.password, 8) });

    UserModel.create(user)
        .then(user => {

            // Once registered successfully, then create JWT TOKEN
            const token = jwt.sign({
                _id: user._id,
                username: user.username,
                email: user.email,
                address: user.address,
                billingaddress: user.billingAddress,
                shippingaddress: user.shippingAddress,
                accounttype: user.accountType,
                subscriptiontype: user.subscriptionType,
                fullname: user.fullName

            }, config.JwtSecret, {
                expiresIn: '24h' // expires in 24 hours
            });

            res.status(200).json({ token: token });
        })
        .catch(error => {
            if (error.code == 11000) { //error 11000 means duplicate record (in this case username or email already exist)
                res.status(400).json({
                    error: 'User exists',
                    message: error.message
                })
            }
            else {
                res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                })
            }
        });

};



const update = (req, res) => {

    if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
        error: 'Bad Request',
        message: 'Http request body must have username property'
    });

    UserModel.findOne({ username: req.body.username }).exec()
        .then(user => {

            if (!user) return res.status(404).json({
                error: 'Not Found',
                message: `User not found`
            });

            if (!Object.prototype.hasOwnProperty.call(req.body, 'fullName')) return res.status(400).json({
                error: 'Bad Request',
                message: 'Http request body must have fullName property'
            });

            if (!Object.prototype.hasOwnProperty.call(req.body, 'accountType')) return res.status(400).json({
                error: 'Bad Request',
                message: 'Http request body must have accountType property'
            });

            if (!Object.prototype.hasOwnProperty.call(req.body, 'address')) return res.status(400).json({
                error: 'Bad Request',
                message: 'Http request body must have address property'
            });

            if (!Object.prototype.hasOwnProperty.call(req.body, 'billingAddress')) return res.status(400).json({
                error: 'Bad Request',
                message: 'Http request body must have billingAddress property'
            });

            if (!Object.prototype.hasOwnProperty.call(req.body, 'shippingAddress')) return res.status(400).json({
                error: 'Bad Request',
                message: 'Http request body must have shippingAddress property'
            });

            var updateUser = {}
            updateUser.fullName = req.body.fullName
            updateUser.accountType = req.body.accountType;
            updateUser.address = req.body.address;

            updateUser.shippingAddress = req.body.shippingAddress;

            updateUser.billingAddress = req.body.billingAddress;

            if (Object.prototype.hasOwnProperty.call(req.body, 'password')) {
                updateUser.password = bcrypt.hashSync(req.body.password, 8)

            };
            UserModel.updateOne(
                { username: req.body.username },
                {
                    $set: updateUser
                })
                .then(user => {


                    res.status(200).json({ token: null });
                })
                .catch(error => {
                    // console.log(error);
                    res.status(500).json({
                        error: 'Internal server error',
                        message: error.message
                    })
                });




        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));



};


const currentUser = (req, res) => {
    UserModel.findById(req.userID).select('username').exec()
        .then(user => {

            if (!user) return res.status(404).json({
                error: 'Not Found',
                message: `User not found`
            });

            res.status(200).json(user)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));
};

const logout = (req, res) => {
    res.status(200).send({ token: null });
};


const listAccountTypes = (req, res) => {
    res.status(200).json(accounttypes);
};


const listSubscriptionTypes = (req, res) => {
    res.status(200).json(subscriptiontypes);
};

module.exports = {
    login,
    register,
    update,
    logout,
    currentUser,
    listAccountTypes,
    listSubscriptionTypes
};