
module.exports = {


  friendlyName: 'Get posts',


  description: '',


  inputs: {
    limit: {
      type: 'number',
    },
    skip: {
      type: 'number',
    },
    userId: {
      type: "string"
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
      let { limit, skip, userId } = inputs;
      let userFriends = await cache.get(`userFriend_${user.id}`);
      let userFriendId = []
      if (userFriends && userFriends.length > 0) {
        userFriends.map((e) => {
          userFriendId.push(e.id)
        })
      }

      limit = limit || 10;
      skip = skip || 0;

      let where = userId ? {
        postBy: userId
      } : {
          or: [
            {
              postBy: { in: userFriendId }
            },
            {
              postBy: user.id
            }
          ]

        }
      let findPosts = await Post.find({
        where,
        limit: limit,
        skip: skip,
        sort: ['created_at DESC', 'ranking DESC']
      }).populate('postBy').populate("sharedPost")
      if (findPosts.length > 0) {
        for (let i = 0; i < findPosts.length; i++) {
          let islike = await Like.findOne({ type: 1, user: user.id, idLiked: findPosts[i].id })
          let totalComment = await Comment.count({ post: findPosts[i].id });
          findPosts[i].totalComment = totalComment;
          findPosts[i].isLike = islike ? true : false;
          findPosts[i].totalReplyComment = await Comment.count({ post: findPosts[i].id, parent: { "!=": "0" } });

          let totalShare = await Post.count({ isShared: true, sharedPost: findPosts[i].id });
          findPosts[i].totalShare = totalShare;


          if (findPosts[i].isShared && findPosts[i].sharedPost) {
            let userInfo = await User.findOne(findPosts[i].sharedPost.postBy);
            findPosts[i].sharedPost.postBy = userInfo;
          }
        }
      }
      let totalPost = await Post.count({ where })
      let isMore;
      if (totalPost / (skip + limit) > 1) {
        isMore = true;
      } else {
        isMore = false;
      }
      return exits.success({
        code: 0,
        data: findPosts,
        isMore
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
