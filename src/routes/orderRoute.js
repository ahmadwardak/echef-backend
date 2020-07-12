"use strict";

const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/orderController');

//Create an order
router.post('/', OrderController.checkOut);
//View an order
router.get('/:id', OrderController.viewOrder);
//Cancel order
router.delete('/:id',OrderController.cancelOrder);

module.exports = router;