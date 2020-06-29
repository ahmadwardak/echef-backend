"use strict";

const express = require('express');
const router = express.Router();

const ShoppingcartController = require('../controllers/shoppingCartController');

router.post('/', ShoppingcartController.create);
router.get('/:id', ShoppingcartController.read);
router.put('/:id', ShoppingcartController.update);

module.exports = router;