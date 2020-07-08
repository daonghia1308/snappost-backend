const User = require("../../models/User");

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

      let userFriendIds = await User.getFriendIds(user.id)

      for (let i = 0; i < data.length; i++) {
        let otherFriendIds = await User.getFriendIds(data[i].from.id);

        let mutualFriend = 0;
        userFriendIds.map(f => {
          if (f !== user.id && f !== data[i].from.id && otherFriendIds.includes(f)) {
            mutualFriend++;
          }
        })
        data[i].from.mutualFriend = mutualFriend;
      }

      let totalRecord = await FriendRequest.count({
        where: {
          to: user.id
        }
      });
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
