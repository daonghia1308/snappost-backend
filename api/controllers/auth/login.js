module.exports = {


  friendlyName: 'Log in',


  description: '',


  inputs: {
    username: {
      type: "string"
    },
    password: {
      type: "string"
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
      let { username, password } = inputs;
      if (!username || !password) {
        return exits.fail({
          code: 400,
          message: "Username and password must be filled!"
        })
      }
      let findUser = await User.findOne({ username: username });
      if (!findUser) {
        return exits.fail({
          code: 400,
          message: "User not exist"
        })
      }
      let check = await sails.helpers.password.check(password)
      if (check) {
        delete findUser.password;
        findUser.token = await sails.helpers.jwt.sign(findUser);
        return exits.success({
          code: 200,
          data: findUser,
        })
      }
      else {
        return exits.fail({
          code: 400,
          message: "Wrong password!"
        })
      }
    } catch (error) {
      return exits.serverError({
        code: 500,
        error: error.message,
        message: "System error!"
      })
    }

  }


};
