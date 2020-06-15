module.exports = {


  friendlyName: 'Send friend request',


  description: '',


  inputs: {
    id: {
      type: 'string',
      description: 'Id nguoi dung nhan loi moi ket ban'
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
      let { id } = inputs;
      let { user } = this.req;
      let createRequest;
      if (!id) {
        return exits.fail({
          code: 1,
          message: 'Missing id!'
        })
      }
      let findUser = await User.findOne(id);
      if (!findUser) {
        return exits.fail({
          code: 1,
          message: 'User not exist!'
        })
      }
      let findFriend = await RelationshipDetail.findOne({
        type: 1,
        or: [
          {
            user: user.id,
            otherUser: id
          },
          {
            user: id,
            otherUser: user.id
          }
        ]
      })
      if (findFriend) {
        return exits.fail({
          code: 1,
          message: 'You are already friend'
        })
      }
      let findRequest = await FriendRequest.findOne({
        from: user.id,
        to: id
      })
      if (findRequest) {
        await FriendRequest.destroy({ id: findRequest.id });
        await RelationshipDetail.destroy({user: user.id, otherUser: id, type: 6})
      }
      else {
        createRequest = await FriendRequest.create({
          from: user.id,
          to: id,
          status: 0
        }).fetch();
        await RelationshipDetail.create({
          user: user.id,
          otherUser: id,
          type: 6
        })
      }
      return exits.success({
        code: 0,
        data: createRequest,
        message: 'Successfully!'
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        error: error.message,
        message: 'System error!'
      })
    }
  }


};
