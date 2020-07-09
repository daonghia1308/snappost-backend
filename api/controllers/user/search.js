const User = require("../../models/User");

module.exports = {


  friendlyName: 'Search',


  description: 'Search user.',


  inputs: {
    keyword: {
      type: 'string'
    },
    type: {
      type: 'number',
      description: "1 để seach theo thông tin người dùng, 2 để search theo nội dung bài viết"
    },
    limit: {
      type: 'number'
    },
    offset: {
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
      let { keyword, type } = inputs;
      let { user } = req;
      let searchResult;
      limit = limit || 5;
      offset = offset || 5;
      if (!keyword || !type) {
        return exits.fail({
          code: 1,
          message: 'Missing keyword or type!'
        })
      }
      let userFriendsList = await User.getFriends(user.id);
      userFriendsList.map(e => { return e.id });
      if (type == 1) {
        searchResult = await User.find({
          where: {
            or: [
              { id: { in: userFriendsList } },
              { email: { contains: keyword } },
              { firstName: { contains: keyword } },
              { lastName: { contains: keyword } },
              { school: { startsWith: keyword } },
              { company: { startsWith: keyword } },
              { currentLocation: { startsWith: keyword } },
              { bornIn: { startsWith: keyword } }
            ]
          },
          limit: limit,
          skip: offset,
          sort: 'createdAt ASC'
        })
      } else {
        searchResult = await Post.find({
          where: {
            content: { contains: keyword }
          },
          limit: limit,
          skip: offset,
          sort: 'createdAt DESC'
        }).populate('postBy');

      }
      return exits.success({
        code: 0,
        data: searchResult
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
