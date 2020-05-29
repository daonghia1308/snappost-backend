const bcrypt = require('bcrypt')
module.exports = {


  friendlyName: 'Hash',


  description: 'Hash password.',


  inputs: {
    password: {
      type: 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },
  fn: async function (inputs, exits) {
    let p = await bcrypt.hash(inputs.password, 12);
    return exits.success(p);
  }


};

