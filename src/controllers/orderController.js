"use strcit";

const {OrderModel} = require('../models/orderModel');
const stripe = require("stripe")("sk_test_51H3MpiKYLWJclmfxIrES4zC6SoxkQOIt79QYpchVC4cNoPiCGg9pOeA2eOzYdOb5A9uW04nmD8DhKKKqDe1zHTRk00FDHLMTl7");
const uuid = require("uuid");



//Creating a new order
const createOrder = async(req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    OrderModel.create(req.body)
        .then(order => res.status(201).json(order))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const checkOut = async(req, res) => {
    console.log("Request:", req.body);

    let error;
    let status;
    try {
        const { product, token } = req.body;

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const idempotency_key = uuid.v4();
        const charge = await stripe.charges.create(
        {
            amount: product.price * 100,
            currency: "eur",
            customer: customer.id,
            receipt_email: token.email,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }
      },
      {
        idempotency_key
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });

};

//Viewing an order
const viewOrder   = (req, res) => {
    OrderModel.findById(req.params.id).exec()
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
    OrderModel.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({message: `Order with id${req.params.id} was cancelled`}))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};


module.exports = {
    checkOut,
    viewOrder,
    cancelOrder
};