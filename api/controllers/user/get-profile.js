module.exports = {


  friendlyName: 'Get profile',


  description: '',


  inputs: {
    userId: { type: "string" },
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
      let { userId } = inputs;
      let { user } = this.req;

      if (!userId) {
        return exits.fail({
          code: 400,
          message: "Missing data body"
        })
      }

      let userInfo = await User.findOne(userId);
      if (!userInfo) {
        return exits.fail({
          code: 404,
          message: "User not exist"
        })
      }
      if (userId == user.id) {
        userInfo.isMe = true;
      }

      if (!userInfo) {
        return exits.fail({
          code: 404,
          message: "User not exist"
        })
      }

      let friends = await User.getFriends(user.id);

      if (friends.includes(userInfo.id));

      userInfo.isFriend = true;

      return exits.success({
        code: 0,
        data: userInfo
      })

    } catch (error) {
      return exits.serverError({
        code: 1,
        error: error.message,
        message: "System encouter a problem. Try again!"
      })
    }

  }


};
