const bcrypt = require('bcrypt')
module.exports = {


  friendlyName: 'Check',


  description: 'Check password.',


  inputs: {
    password: {
      type: 'string'
    },
    hashPassword: {
      type: 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  fn: async function (inputs, exits) {
    let { password, hashPassword } = inputs;
    let rs = await bcrypt.compare(password, hashPassword)
    return exits.success(rs);
  }


};

