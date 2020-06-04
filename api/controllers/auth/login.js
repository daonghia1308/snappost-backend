module.exports = {


  friendlyName: 'Log in',


  description: '',


  inputs: {
    email: {
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
      let { email, password } = inputs;
      let idFriends = [];
      if (!email || !password) {
        return exits.fail({
          code: 400,
          message: "Username and password must be filled!"
        })
      }
      let findUser = await User.findOne({ email: email });
      if (!findUser) {
        return exits.fail({
          code: 400,
          message: "User not exist"
        })
      }
      let check = await sails.helpers.password.check(password, findUser.password)
      if (check) {
        findUser.token = await sails.helpers.jwt.sign(findUser);
        let totalFriend = await User.getFriends(findUser.id);
        totalFriend.map((e) => {
          idFriends.push(e.id);
        })
        let onlineFriends = await User.find({
          id: idFriends,
          online: true
        })
        findUser.totalFriend = totalFriend.length;
        findUser.onlineFriends = onlineFriends
        await User.update({id: findUser.id}).set({online: true});
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
