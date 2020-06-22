module.exports = {


  friendlyName: 'Get posts',


  description: '',


  inputs: {
    limit: {
      type: 'number',
    },
    skip: {
      type: 'number',
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
      let { limit, skip } = inputs;
      let userFriends = await cache.get(`userFriend_${user.id}`);
      let userFriendId = []
      userFriends.map((e) => {
        userFriendId.push(e.id)
      })
      limit = limit || 10;
      skip = skip || 0;
      let findPosts = await Post.find({
        where: {
          or: [
            {
              postBy: { in: userFriendId }
            },
            {
              postBy: user.id
            }
          ]

        },
        limit: limit,
        skip: skip,
        sort: ['created_at DESC', 'ranking DESC']
      }).populate('postBy')
      // if (findPosts.length > 0) {
      //   for (let i = 0; i < findPosts.length; i++) {
      //     let totalComment = await Comment.find({ post: findPosts[i].id });
      //     findPosts[i].totalComment = totalComment.length;
      //     findPosts[i].comments = await Comment.find({ post: findPosts[i].id, parent: 0 }).limit(3).populate('user');
      //     if (findPosts.totalComment > 0) {
      //       for (let j = 0; i < findPosts[i].comments.length; j++) {
      //         findPosts[i].comments[j].commentChild = await Comment.find({ parent: findPosts[i].comments[j].id }).populate('user')
      //         findPosts[i].comments[j].totalCommentChild = findPosts[i].comments[j].commentChild.length;
      //       }
      //     }
      //   }
      // }
      return exits.success({
        code: 0,
        data: findPosts
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        error: error,
        message: 'System error!'
      })
    }
  }


};
