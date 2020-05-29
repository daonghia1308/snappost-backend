const jwt = require('jsonwebtoken');
const moment = require('moment');

module.exports = {
  friendlyName: 'Sign',

  description: 'Sign jwt.',

  inputs: {
    user: { type: 'ref', description: 'Thông tin người dùng', required: true },
    time: {
      type: 'number',
      description: 'Thời gian hết hạn. Đơn vị giừ',
      defaultsTo: 4320,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  sync: true,
  fn: function(inputs, exits) {
    let { user, time } = inputs;
    let input = {
      user,
      createdAt: moment().toDate(),
      expiredAt: moment()
        .add(time, 'hour')
        .toDate(),
    };
    let token = jwt.sign(input, sails.config.globals.tokenSecret);
    return exits.success(token);
  },
};
