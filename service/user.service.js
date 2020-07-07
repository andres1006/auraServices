'use strict'
const Usuario = require('../models/user.model');
const jwt = require('../utils/jwt')
const moment = require('moment');
const bcrypt = require('bcrypt-nodejs')


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
    const savedUser = await userreq.save();
    return savedUser;
  },

  async putUser(id, userreq) {
    var newUser = await Usuario.findByIdAndUpdate(id, userreq);
    if(userreq.contrasenia){
      bcrypt.genSalt(10,(err, salt) => {
        bcrypt.hash(userreq.contrasenia, salt, null,async(err, hash) => {
          userreq.contrasenia = hash
          newUser=await Usuario.findByIdAndUpdate(id, userreq)
          
        })
      });
    }
      return newUser;
  },


  async deleteUser(id) {
    await Usuario.findByIdAndDelete(id);
  },

  async createToken(usuario) {
    const payload = {
      sub: usuario._id,
      iat: moment().unix()
      // exp:  moment().add(accessTokenExpiryTime/60/60/24,'days').unix()            
    }
    return await jwt.generateToken(payload, payload)
  },

  async decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
      try {
        const payload = jwt.getDecodedToken(token)

        if (payload.exp <= moment().unix()) {
          reject({
            status: 401,
            message: 'El token ha expirado'
          })
        }
        resolve(payload.sub)
      } catch (err) {
        reject({
          status: 500,
          message: 'Token no válido'
        })
      }
    })

    return decoded
  }
}
