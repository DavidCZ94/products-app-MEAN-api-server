const express = require('express');
const passport = require('passport');

const UsersClientsService = require('../services/usersClients');
const scopesvalidationHandler = require('../utils/middleware/scopesValidationHandler');
const validationHandler = require('../utils/middleware/validationHandler');
const { userIdScheme, updateUserScheme, createUserScheme } = require('../utils/schemes/users');

require('../utils/auth/strategies/jwt');

const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('../utils/time');
const usersClientsService = new UsersClientsService();

function usersApi(app) {
  const router = express.Router();
  app.use(
    '/api/users',
    passport.authenticate('jwt', { session: false }),
    router
  );

  // Get Users
  router.get( '/',scopesvalidationHandler(['read:products']),
    async function (req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      try {
        const search = req.query.searchBy || '';
        const pageNumber = parseInt(req.query.pageNumber);
        const nPerPage = parseInt(req.query.nPerPage);
        const users = await usersClientsService.getUsers({ search }, nPerPage , pageNumber);
        res.status(200).json({
          data: users,
          message: 'Products listed',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  // Get product by id
  router.get(
    '/:userId',
    scopesvalidationHandler(['read:products']),
    validationHandler({ userId: userIdScheme }, 'params'),
    async function (req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { userId } = req.params;
      try {
        const user = await usersClientsService.getUser( { userId } );
        res.status(200).json({
          data: user,
          message: 'User retrieved'
        })
      } catch (err) {
        next(err);
      }
    }
  )

  // create user

  router.post(
    '/',
    scopesvalidationHandler(['create:products']),
    validationHandler(createUserScheme),
    async function (req, res, next) {
      const { body: user} = req;
      try {
        const createsUserId = await usersClientsService.createUser( { user });
        res.status(201).json({
          data: createsUserId,
          message: 'User created',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  // delete USer

  router.delete(
    '/:userId',
    scopesvalidationHandler(['delete:products']),
    validationHandler({ userId: userIdScheme }, 'params'),
    async function (req, res, next) {
      const { userId } = req.params;
      try {
        const deletedUserId = await usersClientsService.deleteUser({
          userId,
        });
        res.status(200).json({
          data: deletedUserId,
          message: 'User Deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  )

  //Update User

  router.put(
    '/:userId',
    scopesvalidationHandler(['update:products']),
    validationHandler({ userId: userIdScheme }, 'params'),
    validationHandler(updateUserScheme),
    async function (req, res, next) {
      try {
        const { userId } = req.params;
        const { body: user } = req;
        try {
          const updatedUserId = await usersClientsService.updateUser({
            userId,
            user
          });
          res.status(200).json({
            data: updatedUserId,
            message: 'User Updated',
          });
        } catch (err) {
          next(err);
        }
        
      } catch (err) {
        next(err);
      }
    }
  )

}

module.exports = usersApi;
