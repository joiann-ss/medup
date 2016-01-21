'use strict'

const Plugo = require('plugo');

let validate = (decoded, req, callback) => callback(null, true);

exports.register = (plugin, options, next) => {
  plugin.auth.strategy('jwt', 'jwt', {
    key: 'secret',
    validateFunc: validate,
    verifyOptions: {
      algorithms: ['HS256']
    }
  });
  next();
};

exports.register.attributes = {
  name: 'auth'
};