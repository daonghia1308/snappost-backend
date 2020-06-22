module.exports = {


  friendlyName: 'Get',


  description: 'Get comment.',


  inputs: {
    postId: { type: 'string' },
    limit: { type: 'number' },
    skip: { type: 'number' },
    commentId: { type: 'string' }
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
      let { postId, limit, skip, commentId } = inputs;
      let { user } = this.req;
      if (!postId) {
        return exits.fail({
          code: 1,
          message: 'Missing postId!'
        })
      }
      let findPost = await Post.findOne({ id: postId });
      if (!findPost) {
        return exits.fail({
          code: 1,
          message: 'Post not found!'
        })
      }
      limit = limit || 5;
      skip = skip || 0;
      commentId = commentId || 0;
      let findComment = await Comment.find({
        post: postId,
        parent: commentId
      }).limit(limit).skip(skip).populate('user');
      if (!commentId) {
        for (let i = 0; i < findComment.length; i++) {
          findComment[i].commentChild = await Comment.count({ parent: findComment[i].id });
          let islike = await Like.findOne({ type: 2, user: user.id, idLiked: findComment[i].id })
          findComment[i].isLike = islike ? true : false;
        }
      }
      return exits.success({
        code: 0,
        data: findComment
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        error: error.message,
        message: 'System encouter a problem. Try again!'
      })
    }
  }


};
