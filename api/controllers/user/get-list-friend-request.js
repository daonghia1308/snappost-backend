module.exports = {


  friendlyName: 'Get list friend request',


  description: '',


  inputs: {
    limit: {
      type: 'number'
    },
    page: {
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
      let { user } = this.req;
      let { limit, page } = inputs;
      limit = limit || 10;
      page = page || 1;
      let skip = (page - 1) * limit;
      let data = await FriendRequest.find({
        where: {
          to: user.id
        },
        limit: limit,
        skip: skip,
        sort: ['created_at DESC']
      }).populate('from');
      data.map((e) => {
        delete e.from.password
      })
      let totalRecord = await FriendRequest.count();
      let totalPage = Math.ceil(totalRecord / limit);
      return exits.success({
        code: 0,
        limit,
        page,
        totalRecord,
        totalPage,
        data
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
