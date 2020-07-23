const User = require("../../models/User");

module.exports = {


  friendlyName: 'Create room',


  description: '',


  inputs: {
    memberId: {
      type: "json",
      description: "Id thành viên nhóm chat"
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
      let { user } = this.req;
      let { memberId } = inputs;
      if (!memberId) {
        return exits.fail({
          code: 1,
          message: "Missing memberId!"
        })
      }
      let roomName = `${user.firstName + user.lastName} and friends`
      let data = {
        roomUser: memberId,
        manager: [user.id],
        roomName: roomName
      }
      let newRoom = await Chat.create(data).fetch();
      return exits.success({
        code: 0,
        message: 'success',
        data: newRoom
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        error: error.message,
        message: "System error!"
      })
    }

  }


};
