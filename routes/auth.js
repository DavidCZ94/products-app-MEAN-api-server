const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const ApiKeysService = require('../services/apiKeys');
const Userservice = require('../services/users'); 
const validationHandler = require('../utils/middleware/validationHandler');
const { createUserScheme } = require('../utils/schemes/users');
const { config } = require('../config');

// basic strategy

require('../utils/auth/strategies/basic');

function authApi(app) {
  const router = express.Router();
  const apiKeysService = new ApiKeysService();
  const userService = new Userservice();
  
  app.use('/api/auth', router);
  router.post('/sign-in', async function (req, res, next) {
    const { apiKeyToken } = req.body;
    if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken is required'));
    }

    passport.authenticate('basic', { session: false }, function (error, user) {
      try {
        if (error || !user) {
          next(boom.unauthorized());
        }
        // req.login is ised to establish a session
        req.login(user, { session: false }, async function (error) {
          if (error) {
            next(error);
          }

          const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });
          if (!apiKey) {
            next(boom.unauthorized());
          }

          const { _id: id, name, email } = user;

          const payLoad = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes,
          };
          const token = jwt.sign(payLoad, config.authJwtSecret, {
            expiresIn: '30 days',
          });

          return res.status(200).json({ token, user: { id, name, email } });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post('/sign-up', validationHandler(createUserScheme), async function(req, res, next){
    const { body: user } = req;
    try {
      const createdUserId = await userService.createUser({ user });
      res.status(201).json({
        data: createdUserId,
        message: 'user created'
      });
    } catch (error) {
      next(error);
    }

  });
}


module.exports = authApi;