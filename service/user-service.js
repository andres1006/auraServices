const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../utils/jwt');
const Usuario = require('../models/user.model');

const { error } = console;

module.exports = {
  async getAllUsers() {
    const users = await Usuario.find();
    return users;
  },

  async getUserById(id) {
    const user = await Usuario.findById(id);
    return user;
  },

  async postUser(userreq) {
    try {
      const savedUser = await userreq.save();
      return savedUser;
    } catch (e) {
      error(e);
      return e;
    }
  },

  async putUser(id, userreq) {
    let newUser = await Usuario.findByIdAndUpdate(id, userreq);
    if (userreq.contrasenia) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userreq.contrasenia, salt, null, async (_err, hash) => {
          // eslint-disable-next-line no-param-reassign
          userreq.contrasenia = hash;
          newUser = await Usuario.findByIdAndUpdate(id, userreq);
        });
      });
    }
    return newUser;
  },

  async deleteUser(id) {
    await Usuario.findByIdAndDelete(id);
  },

  async createToken(usuario) {
    const payload = {
      // eslint-disable-next-line no-underscore-dangle
      sub: usuario._id,
      iat: moment().unix(),
      // exp:  moment().add(accessTokenExpiryTime/60/60/24,'days').unix()
    };
    return jwt.generateToken(payload, payload);
  },

  async decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
      try {
        const payload = jwt.getDecodedToken(token);

        if (payload.exp <= moment().unix()) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            status: 401,
            message: 'El token ha expirado',
          });
        }
        resolve(payload.sub);
      } catch (err) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          status: 500,
          message: 'Token no válido',
        });
      }
    });

    return decoded;
  },
};
