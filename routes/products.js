const express = require('express');
const ProductsService = require('../services/products');

function productsApi(app) {
  const router = express.Router();
  app.use('/api/products', router);

  const productsService = new ProductsService();

  router.get('/', async function (req, res, next) {
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
  });

  router.get('/:productId', async function (req, res, next) {
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
  });

  router.post('/', async function (req, res, next) {
    const { body: product } = req;
    try {
      const createdProductId = await productsService.createProduct( {product} );

      res.status(201).json({
        data: createdProductId,
        message: 'Product create',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:productId', async function (req, res, next) {
    const { productId } = req.params;
    const { body: product } = req;
    try {
      const updatesProductId = await productsService.updateProduct({ productId, product });

      res.status(200).json({
        data: updatesProductId,
        message: 'Product Updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:productId', async function (req, res, next) {
    const { productId } = req.params;
    try {
      const deleteProductId = await productsService.deleteProduct({ productId });
      res.status(200).json({
        data: deleteProductId,
        message: 'Product Deleted',
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = productsApi;