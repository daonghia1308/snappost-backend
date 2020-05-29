const jwt = require('jsonwebtoken');
const moment = require('moment');

module.exports = {
  friendlyName: 'Verify',

  description: 'Verify jwt.',

  inputs: {
    token: {
      type: 'string',
      description: 'Token cần kiểm tra',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  sync: true,
  fn: function(inputs, exits) {
    let { token } = inputs;
    try {
      let decoded = jwt.verify(token, sails.config.globals.tokenSecret);
      if (moment().isBefore(moment(decoded.expiredAt).toDate())) {
        return exits.success(decoded.user);
      } else {
        throw new Error(Err.CODE.TOKEN_EXPIRED);
      }
    } catch (err) {
      throw new Error(Err.CODE.TOKEN_EXPIRED);
    }
  },
};
