module.exports = {


  friendlyName: 'Unfriend',


  description: 'Unfriend user.',


  inputs: {
    id: { type: 'string', description: 'Id unfriend user' }
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
      let { user } = this.req
      if (!id) {
        return exits.fail({
          code: 1,
          message: 'Missing user id!'
        })
      }
      let friends = await cache.get(`userFriend_${user.id}`);
      friends = friends.map((e) => {
        return e.id
      })
      if (!friends.includes(id)) {
        return exits.fail({
          code: 1,
          message: 'Friend not exist!'
        })
      }
      await RelationshipDetail.destroy({
        or: [
          {
            user: id,
            otherUser: user.id
          },
          {
            user: user.id,
            otherUser: id
          }
        ]
      })
      await User.refreshFriendCache(id);
      return exits.success({
        code: 0,
        message: 'Unfriend successfully!'
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
