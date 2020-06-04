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
      await RelationshipDetail.destroy({
        or: [
          { user: { in: [id, user.id] } },
          { otherUser: { in: [id, user.id] } }
        ]
      })
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
