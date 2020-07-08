require('dotenv').config();

const { checkEnvironmentVariables } = require('../utils/env');

const envVariables = ['JWT_SECRET'];

checkEnvironmentVariables(envVariables);


module.exports = {
  // Server options
  host: '0.0.0.0',
  port: parseInt(process.env.PORT, 10) || 8080,

  // JWT config
  JWT: {
    algorithm: ['HS256','HS256'],
    accessTokenExpiryTime: 86400, // 1 day
    refreshTokenExpiryTime: 3600, // 1 hour
    secret: process.env.JWT_SECRET,
  },
};
