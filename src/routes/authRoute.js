"use strict";

const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares/middlewares');
const AuthController = require('../controllers/authController');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.put('/update', middlewares.checkAuthentication, AuthController.update); //to update user detail along with password
router.get('/logout', middlewares.checkAuthentication, AuthController.logout);
router.get('/currentUser', middlewares.checkAuthentication, AuthController.currentUser);

module.exports = router;