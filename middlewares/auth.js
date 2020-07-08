const jwt = require('express-jwt');
//const jwt = require('jsonwebtoken');

require('dotenv').config();

const UsuarioService = require('../service/user.service');
const { JWT } = require('../config');
const { options } = require('superagent');
const { secret, algorithm } = JWT;

/**
 * Express request handlers that verify if a valid token exists in request.
 *
 * The token can be passed as an `Authorization` header or a query parameter named `token`.
 *
 * Decoded payload will then be available in `req.auth`.
 *
 * @example
 *
 * // /src/api/routes/users.js
 *
 * const usersController = require('../controllers/users');
 * const { auth } = require('../middlewares');
 *
 * router.get('/users', auth.required, usersController.getUsers);
 */

function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No tienes autorización' });
  }

  const token = req.headers.authorization.split(' ')[1];
  //Bearer sdkasdlajsiejapj

  UsuarioService.decodeToken(token)
    .then((response) => {
      req.user = response;

      next();
    })
    .catch((response) => {
      res.status(response.status).send({ message: response.message });
    });
}
module.exports = {
  data: jwt({
    secret,
    algorithms: algorithm,
  }),
  /*   required: jwt({
    secret,
    requestProperty: 'auth'
  }),
  optional: jwt({
    secret,
    requestProperty: 'auth',
    credentialsRequired: false
  }), */
  isAuth,
};
