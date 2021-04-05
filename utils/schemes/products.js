const joi = require('@hapi/joi');

const productIdScheme = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productCreatingDateScheme = joi.date().less('12-31-2020');
const productNameScheme = joi.string().max(100);
const productBrandScheme = joi.string().max(100);
const productClassScheme = joi.string().max(100);
const productDistributorScheme = joi.string().max(100);
const productStockScheme = joi.number().integer().min(0).max(999999999);
const productPositionScheme = joi.string().max(50);
const productSkuScheme = joi.string().max(50);
const productSalePriceScheme = joi.number().min(0).max(999999999);
const productCostPriceScheme = joi.number().min(0).max(999999999);
const productTagsSchema = joi.array().items(joi.string().max(50));

const createProductSccheme =  {
    creating_date: productCreatingDateScheme,
    name: productNameScheme.required(),
    brand: productBrandScheme.required(),
    class: productClassScheme.required(),
    distributor: productDistributorScheme.required(),
    stock: productStockScheme.required(),
    position: productPositionScheme.required(),
    sku: productSkuScheme,
    sale_price: productSalePriceScheme.required(),
    cost_price: productCostPriceScheme.required(),
    tags: productTagsSchema
};

const updateProductScheme = {
    creating_date: productCreatingDateScheme,
    name: productNameScheme,
    brand: productBrandScheme,
    class: productClassScheme,
    distributor: productDistributorScheme,
    stock: productStockScheme,
    position: productPositionScheme,
    sku: productSkuScheme,
    sale_price: productSalePriceScheme,
    cost_price: productCostPriceScheme,
    tags: productTagsSchema
};

module.exports = {
    productIdScheme,
    createProductSccheme,
    updateProductScheme
};