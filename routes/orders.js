const express = require('express');
const passport = require('passport');

const OrdersService = require('../services/orders');
const scopesValidationHamdler = require('../utils/middleware/scopesValidationHandler');
const validatioHandler = require('../utils/middleware/validationHandler');
const { orderIdScheme, updateOrderScheme, createOrderScheme } = require('../utils/schemes/orders');

const cacheResponse = require('../utils/cacheResponse');
const {
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS
} = require ('../utils/time');
const orderService = new OrdersService();

function ordersApi(app) {
    const router = express.Router();
    app.use(
        '/api/orders',
        passport.authenticate('jwt', { session: false }),
        router
    )

    //Create Order
    router.post(
        '/',
        scopesValidationHamdler(['create:products']),
        validatioHandler(createOrderScheme),
        async function (req, res, next) {
            const { body: order } = req;
            try {
                const createOrderId = await orderService.createOrder( { order } );
                res.status(201).json({
                    data:  createOrderId,
                    message: 'Order created',
                });
            } catch (err) {
                next(err);
            }
        }
    )

};

module.exports = ordersApi;