const express = require('express');
const { productsMock } = require('../utils/mocks/MOCK_DATA');

function productsApi(app) {
    const router = express.Router();
    app.use('/api/products', router);

    router.get('/', async function(req, res, next){
        try {
            const products = await Promise.resolve(productsMock);

            res.status(200).json({
                data: products,
                message: 'Products listed'
            })
        } catch (error) {
            next(err);
        }
    });

    router.get('/:productId', async function(req, res, next){
        try {
            const product = await Promise.resolve(productsMock[0]);

            res.status(200).json({
                data: product,
                message: 'Product retrieved'
            })
        } catch (error) {
            next(err);
        }
    });

    router.post('/', async function(req, res, next){
        try {
            const createdProductId = await Promise.resolve(productsMock[0].id);

            res.status(201).json({
                data: createdProductId,
                message: 'Product create'
            })
        } catch (error) {
            next(err);
        }
    });

    router.put('/:productId', async function(req, res, next){
        try {
            const updatesProductId = await Promise.resolve(productsMock[0].id);

            res.status(200).json({
                data: updatesProductId,
                message: 'Product Updated'
            })
        } catch (error) {
            next(err);
        }
    });

    router.delete('/:productId', async function(req, res, next){
        try {
            const deleteProductId = await Promise.resolve(productsMock[0].id);

            res.status(200).json({
                data: deleteProductId,
                message: 'Product Deleted'
            })
        } catch (error) {
            next(err);
        }
    });
};

module.exports = productsApi;