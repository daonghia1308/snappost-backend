module.exports = {


  friendlyName: 'Get list friend',


  description: '',


  inputs: {
    limit: { type: 'number' },
    page: { type: 'number' }
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
      let { limit, page } = inputs;
      let { user } = this.req;
      limit = parseInt(limit) || 10;
      page = parseInt(page) || 1;
      let offset = (page - 1) * limit;
      let friends = await User.getFriends(user.id);
      let totalPage = Math.ceil(friends.length / limit);
      return exits.success({
        code: 0,
        data: friends.slice(offset).slice(0, limit ? limit : 10),
        totalRecord: friends.length,
        totalPage
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
