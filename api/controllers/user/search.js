const toSlug = require("../../services/toSlug");

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
      let { keyword, type, limit, offset } = this.req.query;
      let { user } = this.req;
      let searchResult;
      let data = [];
      limit = limit || 5;
      offset = offset || 0;
      if (!keyword || !type) {
        return exits.fail({
          code: 1,
          message: 'Missing keyword or type!'
        })
      }
      let userFriendsList = await User.getFriends(user.id);
      userFriendsList = userFriendsList.map(e => { return e.id });
      if (type == 1) {
        searchResult = await User.find({
          where: {
            or: [
              { email: { contains: keyword } },
              { firstName: { contains: keyword } },
              { lastName: { contains: keyword } },
              { school: { startsWith: keyword } },
              { company: { startsWith: keyword } },
              { currentLocation: { startsWith: keyword } },
              { bornIn: { startsWith: keyword } },
              { email: { contains: keyword.toLowerCase() } },
              { firstName: { contains: keyword.toLowerCase() } },
              { lastName: { contains: keyword.toLowerCase() } },
              { school: { startsWith: keyword.toLowerCase() } },
              { company: { startsWith: keyword.toLowerCase() } },
              { currentLocation: { startsWith: keyword.toLowerCase() } },
              { bornIn: { startsWith: keyword.toLowerCase() } },
              { email: { contains: toSlug(keyword.toLowerCase()) } },
              { firstName: { contains: toSlug(keyword.toLowerCase()) } },
              { lastName: { contains: toSlug(keyword.toLowerCase()) } },
              { school: { startsWith: toSlug(keyword.toLowerCase()) } },
              { company: { startsWith: toSlug(keyword.toLowerCase()) } },
              { currentLocation: { startsWith: toSlug(keyword.toLowerCase()) } },
              { bornIn: { startsWith: toSlug(keyword.toLowerCase()) } },
            ]
          },
          limit: limit,
          skip: offset
        })
        for (let i = 0; i < searchResult.length; i++) {
          if (searchResult[i].id == user.id) {
            delete searchResult[i];
          } else {
            if (userFriendsList.includes(searchResult[i].id)) {
              searchResult[i].isFriend = true;
            }
            else {
              searchResult[i].isFriend = false;
              let friendRequest = await FriendRequest.find({ from: user.id, to: searchResult[i].id });
              if (friendRequest.length > 0) {
                searchResult[i].statusFriendRequest = "send request"
                searchResult[i].requestInfo = friendRequest[0]
              }
              else {
                let requestFriend = await FriendRequest.find({ from: searchResult[i].id, to: user.id });
                if (requestFriend.length > 0) {
                  searchResult[i].statusFriendRequest = "requested"
                  searchResult[i].requestInfo = requestFriend[0]
                }
                else {
                  searchResult[i].statusFriendRequest = "none"
                }
              }

            }
            searchResult[i].numberOfFriendMutual = await User.getNumberOfFriendMutual(user.id, searchResult[i].id);

          }

        }

      } else {
        searchResult = await Post.find({
          where: {
            content: { contains: keyword }
          },
          limit: limit,
          skip: offset,
          sort: 'created_at DESC'
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
