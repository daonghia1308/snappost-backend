module.exports = {


  friendlyName: 'Handle friend request',


  description: '',


  inputs: {
    id: {
      type: 'string',
      description: 'Id friend request'
    },
    status: {
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
      let { id, status } = inputs;
      let { user } = this.req;
      if (!id || !status) {
        return exits.fail({
          code: 1,
          message: 'Missing data body!'
        })
      }
      let findRequest = await FriendRequest.findOne({
        id: id,
        or: [
          {from: user.id},
          {to: user.id}
        ]
      });
      if (!findRequest) {
        return exits.fail({
          code: 1,
          message: 'Friend request not exist!'
        })
      }
      if (status == 1) {
        await RelationshipDetail.create({
          user: user.id,
          otherUser: findRequest.from,
          type: 1
        })
      }
      await FriendRequest.destroy({id: findRequest.id});
      return exits.success({
        code: 0,
        message: "Handle successfully!"
      })
    } catch (error) { 
      return exits.serverError({
        code: 1,
        error: error.message
      })
    }
  }


};
