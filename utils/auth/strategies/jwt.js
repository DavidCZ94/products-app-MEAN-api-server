const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

const UserService = require('../../../services/users');
const { config } = require('../../../config');

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function (tokenPayLoad, cb) {
      const userService = new UserService();
      try {
        const user = await userService.getUser({ email: tokenPayLoad.email });

        if (!user) {
          return cb(boom.unauthorized(), false);
        }

        delete user.passport;
        cb(null, { ...user, scopes: tokenPayLoad.scopes });
      } catch (error) {
        return cb(error);
      }
    }
  )
);
