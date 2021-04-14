const express = require('express');
const passport = require('passport');
const ProductsService = require('../services/products');

const validationHandler = require('../utils/middleware/validationHandler');
const scopesvalidationHandler = require('../utils/middleware/scopesValidationHandler');
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

  // Get products
  router.get( '/',scopesvalidationHandler(['read:products']),
    async function (req, res, next) {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      try {
        const search = req.query.searchBy || '';
        const products = await productsService.getProducts({ search });
        res.status(200).json({
          data: products,
          message: 'Products listed',
        });
      } catch (err) {
        next(err);
      }
    }
  );
  // Get product by id
  router.get(
    '/:productId',
    scopesvalidationHandler(['read:products']),
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
  // Create new product
  router.post(
    '/',
    scopesvalidationHandler(['create:products']),
    validationHandler(createProductSccheme),
    async function (req, res, next) {
      const { body: product } = req;
      try {
        const createdProductId = await productsService.createProduct({ product });
        res.status(201).json({
          data: createdProductId,
          message: 'Product created',
        });
      } catch (err) {
        next(err);
      }
    }
  );
  //Update product by id
  router.put(
    '/:productId',
    scopesvalidationHandler(['update:products']),
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
  //Delete product
  router.delete(
    '/:productId',
    scopesvalidationHandler(['delete:products']),
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
