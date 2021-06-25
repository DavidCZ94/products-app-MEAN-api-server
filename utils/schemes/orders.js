const joi = require('@hapi/joi');

const orderIdScheme = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const orderCreationDate = joi.date();
const orderClientId = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const orderPaidOut = joi.boolean();
const orderstatus = joi.string().min(7).max(9);
const orderDeliveryAddress = joi.string();
const orderShoppingCart = joi.array();
const updatedProducstInform = joi.array();
const clientName = joi.string();

const createOrderScheme = {
    clientId: orderClientId.required(),
    clientName: clientName.required(),
    paid_out: orderPaidOut.required(),
    status: orderstatus.required(),
    delivery_address: orderDeliveryAddress,
    shopping_cart: orderShoppingCart.required(),
    updatedProducstInform: updatedProducstInform
}

const updateOrderScheme = {
    creation_date: orderCreationDate.required(),
    clientId: orderClientId.required(),
    clientName: clientName,
    paid_out: orderPaidOut.required(),
    status: orderstatus.required(),
    delivery_address: orderDeliveryAddress.required(),
    shopping_cart: orderShoppingCart.required(),
    updatedProducstInform: updatedProducstInform,
    _id: orderIdScheme
}

module.exports = {
    createOrderScheme,
    updateOrderScheme,
    orderIdScheme
}