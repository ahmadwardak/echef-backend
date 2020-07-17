"use strcit";

const {OrderModel} = require('../models/orderModel');
const stripe = require("stripe")("sk_test_51H3MpiKYLWJclmfxIrES4zC6SoxkQOIt79QYpchVC4cNoPiCGg9pOeA2eOzYdOb5A9uW04nmD8DhKKKqDe1zHTRk00FDHLMTl7");
const uuid = require("uuid");


const checkOut = async(req, res) => {
    console.log("Request:", req.body);

    
    try {
        const { cart, orderDetails, token } = req.body;

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const idempotencyKey = uuid.v4();
        const charge = await stripe.charges.create(
        {
            amount: (Math.round((cart.totalPrice + cart.shipmentCost)*100)/100) * 100,
            currency: "eur",
            customer: customer.id,
            receipt_email: token.email,
            shipping: {
                name: orderDetails.LastName,
                address: {
                    line1: orderDetails.AddressLine1,
                    line2: orderDetails.AddressLine2,
                    city: orderDetails.City,
                    country: orderDetails.Country,
                    postal_code: orderDetails.Zipcode
                }
            }
      },
      {
        idempotencyKey
      }
    );
    console.log("Charge:", { charge });
    let orderReq ={
        customerID:orderDetails.User,
        cartItems:cart.cartItems,
        itemsPrice:cart.totalPrice,
        shipmentCost:cart.shipmentCost,
        totalCost: Math.round((cart.totalPrice + cart.shipmentCost)*100)/100,
        shippingInfo:{
            FirstName:orderDetails.FirstName,
            LastName:orderDetails.LastName,
            AddressLine1:orderDetails.AddressLine1,
            AddressLine2:orderDetails.AddressLine2,
            City:orderDetails.City,
            Country:orderDetails.Country,
            Region:orderDetails.Region,
            Zipcode:orderDetails.Zipcode
        }
    }
    OrderModel.create(orderReq)
        .then(order => res.status(200).json({
            order,
            status: 'success'}))
        .catch(error => res.status(500).json({
            status:'failure',
            error: 'Internal server error',
            message: error.message
        }));
  } catch (error) {
    res.status(400).json({
        status: 'failure',
        error: 'Bad Request',
        message: 'The request body is empty'
    });
  }

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