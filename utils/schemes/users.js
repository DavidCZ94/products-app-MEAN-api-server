const joi = require ('@hapi/joi');

const userIdScheme = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userNameScheme = joi.string().max(100).required();
const useEmailScheme = joi.string().email().required();
const userPasswordScheme = joi.string();
const userPhoneScheme = joi.string().empty('').default('');
const userDeliveryAddressScheme = joi.string().empty('').default('');
const userBirthDateScheme = joi.date().less('now');
const userDocumentNumberScheme = joi.string().empty('').default('');
const userOrdersScheme = joi.array();
const userIsAdminScheme = joi.boolean().default(false);

const createUserScheme = {
    name: userNameScheme,
    email: useEmailScheme,
    password: userPasswordScheme,
    phone: userPhoneScheme,
    deliveryAddress: userDeliveryAddressScheme,
    birthDate: userBirthDateScheme,
    documentNumber: userDocumentNumberScheme,
    orders: userOrdersScheme,
    isAdmin: userIsAdminScheme
}

const updateUserScheme = {
    name: userNameScheme,
    email: useEmailScheme,
    phone: userPhoneScheme,
    deliveryAddress: userDeliveryAddressScheme,
    birthDate: userBirthDateScheme,
    documentNumber: userDocumentNumberScheme,
    orders: userOrdersScheme,
    isAdmin: userIsAdminScheme
}

module.exports = {
    userIdScheme, 
    createUserScheme,
    updateUserScheme
}