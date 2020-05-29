module.exports = {


  friendlyName: 'Create',


  description: 'Create user.',


  inputs: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },
    gender: {
      type: 'number'
    }
  },


  exits: {
    success: {
      statusCode: 200
    },
    fail: {
      statusCode: 400
    },
    serverError: {
      statusCode: 500
    }
  },


  fn: async function (inputs, exits) {
    try {
      let {   firstName, lastName, email, password, phone, gender } = inputs;
      let findUser = await User.findOne({email: email});
      if (findUser) {
        return exits.fail({
          code: 400,
          message: "User has existed!"
        })
      }
      let hashPassword = await sails.helpers.password.hash(password);
      let data = {
        firstName,
        lastName,
        email,
        password: hashPassword,
        phone,
        gender
      }
      let createUser = await User.create(data).fetch();
      delete createUser.password;
      createUser.token = await sails.helpers.jwt.sign(createUser);
      return exits.success({
        code: 200,
        data: createUser,
        message: "Sign up success!"
      })
    } catch (error) {
      return exits.serverError({
        code: 500,
        error: error.message
      })
    }
  }


};
