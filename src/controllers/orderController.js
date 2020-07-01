"use strcit";

const {OrderModal} = require('../models/orderModal');


//Creating a new order
const createOrder = async(req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    OrderModal.create(req.body)
        .then(order => res.status(201).json(order))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

//Viewing an order
const viewOrder   = (req, res) => {
    OrderModal.findById(req.params.id).exec()
        .then(order => {
            console.log(req);
            if (!order) return res.status(404).json({
                error: 'Not Found',
                message: `Order not found`
            });

            res.status(200).json(order)

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));

};


//Cancel an order
const cancelOrder = (req, res) => {
    OrderModal.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({message: `Order with id${req.params.id} was cancelled`}))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};


module.exports = {
    createOrder,
    viewOrder,
    cancelOrder
};