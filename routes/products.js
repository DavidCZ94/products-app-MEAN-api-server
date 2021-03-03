const express = require('express');
const passport = require('passport');
const ProductsService = require('../services/products');

const validationHandler = require('../utils/middleware/validationHandler');
const {
  productIdScheme,
  createProductSccheme,
  updateProductScheme,
} = require('../utils/schemes/products');

require('../utils/auth/strategies/jwt');

const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('../utils/time');

function productsApi(app) {
  const router = express.Router();
  app.use('/api/products',
  passport.authenticate('jwt', { session: false }),
  router);

  const productsService = new ProductsService();

  router.get(
    '/',
    async function (req, res, next) {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { tags } = req.query;
      try {
        const products = await productsService.getProducts({ tags });
        res.status(200).json({
          data: products,
          message: 'Products listed',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/:productId',
    validationHandler({ productId: productIdScheme }, 'params'),
    async function (req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { productId } = req.params;
      try {
        const product = await productsService.getProduct({ productId });
        res.status(200).json({
          data: product,
          message: 'Product retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createProductSccheme),
    async function (req, res, next) {
      const { body: product } = req;
      try {
        const createdProductId = await productsService.createProduct({
          product,
        });
        res.status(201).json({
          data: createdProductId,
          message: 'Product created',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/:productId',
    validationHandler({ productId: productIdScheme }, 'params'),
    validationHandler(updateProductScheme),
    async function (req, res, next) {
      const { productId } = req.params;
      const { body: product } = req;
      try {
        const updatesProductId = await productsService.updateProduct({
          productId,
          product,
        });

        res.status(200).json({
          data: updatesProductId,
          message: 'Product Updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:productId',
    validationHandler({ productId: productIdScheme }, 'params'),
    async function (req, res, next) {
      const { productId } = req.params;
      try {
        const deleteProductId = await productsService.deleteProduct({
          productId,
        });
        res.status(200).json({
          data: deleteProductId,
          message: 'Product Deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = productsApi;
