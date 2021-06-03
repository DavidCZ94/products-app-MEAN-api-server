const express = require('express');
const passport = require('passport');

const OrdersService = require('../services/orders');
const scopesValidationHamdler = require('../utils/middleware/scopesValidationHandler');
const validationHandler = require('../utils/middleware/validationHandler');
const { orderIdScheme, updateOrderScheme, createOrderScheme } = require('../utils/schemes/orders');

const cacheResponse = require('../utils/cacheResponse');
const {
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS
} = require ('../utils/time');
const { cache } = require('@hapi/joi');
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
        validationHandler(createOrderScheme),
        async function (req, res, next) {
            const { body: order } = req;
            try {
                const createOrderInform = await orderService.createOrder( { order } );
                res.status(201).json({
                    data:  createOrderInform,
                    message: 'Order created',
                });
            } catch (err) {
                next(err);
            }
        }
    )

    // Get orders
    router.get( 
        '/', 
        scopesValidationHamdler(['read:products']),
        async function (req, res, next) {
            cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);       
            try {
                const search = req.query.searchBy || '';
                const pageNumber = parseInt(req.query.pageNumber);
                const nPerPage = parseInt(req.query.nPerPage);
                const orders = await orderService.getOrders({ search }, nPerPage , pageNumber);
                res.status(200).json({
                    data: orders,
                    message: 'orders listed'
                });
            } catch (err) {
                next(err);
            } 
        }
    );
    // Get orders byID
    router.get(
        '/:orderId',
        scopesValidationHamdler(['read:products']),
        validationHandler({ orderId: orderIdScheme }, 'params'),
        async function (req, res, next) {
            cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
            const { orderId } = req.params;
            try {
                const order = await orderService.getOrder( orderId );
                res.status(200).json({
                    data: order,
                    message: 'Order retrieves'
                });
            } catch (err) {
                next(err);
            }
        }
    );

    // Update Order
    router.put(
        '/:orderId',
        scopesValidationHamdler(['update:products']),
        //validationHandler({ orderId: orderIdScheme }, 'params'),
        validationHandler(updateOrderScheme),
        async function (req, res, next) {
          const { body: order } = req;
          const { orderId } = req.params || order._id;
          delete order._id;
          try {
            const updatedOrderId = await orderService.updateOrder({
                orderId,
                order,
            });
            res.status(200).json({
                data: updatedOrderId,
                message: 'Order Updated'
            });
          } catch (err) {
            next(err);
          }
        }
      );

};

module.exports = ordersApi;