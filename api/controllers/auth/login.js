
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
          code: 1,
          message: "Username and password must be filled!"
        })
      }
      let findUser = await User.findOne({ email: email });
      if (!findUser) {
        return exits.fail({
          code: 404,
          message: "User not exist"
        })
      }
      let check = await sails.helpers.password.check(password, findUser.password)
      if (check) {
        let token = await sails.helpers.jwt.sign(findUser);
        let totalFriend = await User.getFriends(findUser.id);
        totalFriend.map((e) => {
          idFriends.push(e.id);
        })
        let onlineFriends = await User.find({
          id: idFriends,
          online: true,
          data: {}
        })
        findUser.totalFriend = totalFriend.length;
        findUser.onlineFriends = onlineFriends
        await User.update({ id: findUser.id }).set({ online: true });
        await sails.helpers.socket.blast.with({
          arrayId: idFriends,
          event: "login"
        })
        return exits.success({
          code: 0,
          data: findUser,
          token
        })
      }
      else {
        return exits.fail({
          code: 1,
          message: "Wrong password!"
        })
      }
    } catch (error) {
      return exits.serverError({
        code: 1,
        error: error.message,
        message: "System error!"
      })
    }

  }


};
