"use strict";

const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');

const OrderController = require('../controllers/orderController');

//Create an order
router.post('/', middlewares.checkAuthentication, OrderController.checkOut);
//View an order
router.get('/:id', middlewares.checkAuthentication, OrderController.getOrdersByUserID);
//Cancel order
router.delete('/:id', middlewares.checkAuthentication, OrderController.cancelOrder);

module.exports = router;