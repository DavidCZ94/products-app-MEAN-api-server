const joi = require('@hapi/joi');

const productIdScheme = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productCreatingDateScheme = joi.date().less('now');
const productNameScheme = joi.string().max(100);
const productBrandScheme = joi.string().max(100);
const productClassScheme = joi.string().max(100);
const productDistributorScheme = joi.string().max(100);
const productStockScheme = joi.number().integer().min(-999999999).max(999999999);
const productPositionScheme = joi.string().max(50);
const productSkuScheme = joi.string().max(50);
const productSalePriceScheme = joi.number().min(0).max(999999999);
const productCostPriceScheme = joi.number().min(0).max(999999999);
const productTagsSchema = joi.array();
const productPictures = joi.array();
const isActive = joi.boolean();

const createProductSccheme =  {
    name: productNameScheme.required(),
    brand: productBrandScheme.required(),
    class: productClassScheme.required(),
    distributor: productDistributorScheme.required(),
    stock: productStockScheme.required(),
    position: productPositionScheme.required(),
    sale_price: productSalePriceScheme.required(),
    cost_price: productCostPriceScheme.required(),
    creation_date: productCreatingDateScheme,
    sku: productSkuScheme,
    tags: productTagsSchema,
    productPictures: productPictures,
    isActive: isActive.required(),
};

const updateProductScheme = {
    creation_date: productCreatingDateScheme,
    name: productNameScheme,
    brand: productBrandScheme,
    class: productClassScheme,
    distributor: productDistributorScheme,
    stock: productStockScheme,
    position: productPositionScheme,
    sku: productSkuScheme,
    sale_price: productSalePriceScheme,
    cost_price: productCostPriceScheme,
    tags: productTagsSchema,
    productPictures: productPictures,
    isActive: isActive.required(),
};

module.exports = {
    productIdScheme,
    createProductSccheme,
    updateProductScheme
};