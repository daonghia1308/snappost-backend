module.exports = {


  friendlyName: 'Edit',


  description: 'Edit post.',


  inputs: {
    postId: { type: 'string' },
    content: { type: 'string' },
    upload: { type: 'json' },
    mentions: { type: 'json' }
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
      const { postId, mentions, upload, content } = inputs;
      let findPost = await Post.findOne({ id: postId });
      if (!findPost) {
        return exits.fail({
          code: 1,
          message: 'Post is not exists!'
        })
      }

      let updatedPost = await Post.update({ id: postId }).set({
        content,
        upload,
        mentions
      }).fetch();

      updatedPost[0].postBy = await User.findOne(updatedPost[0].postBy);

      if (updatedPost[0].isShared) {
        updatedPost[0].sharedPost = await Post.findOne(updatedPost[0].sharedPost)
      }

      let islike = await Like.findOne({ type: 1, user: user.id, idLiked: updatedPost[0].id })
      let totalComment = await Comment.count({ post: updatedPost[0].id });
      updatedPost[0].totalComment = totalComment;
      updatedPost[0].isLike = islike ? true : false;

      let totalShare = await Post.count({ isShared: true, sharedPost: updatedPost[0].id });
      updatedPost[0].totalShare = totalShare;


      if (updatedPost[0].isShared && updatedPost[0].sharedPost) {
        let userInfo = await User.findOne(updatedPost[0].sharedPost.postBy);
        updatedPost[0].sharedPost.postBy = userInfo;
      }

      return exits.success({
        code: 0,
        message: 'Post updated',
        data: updatedPost[0]
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        message: 'System error!'
      })
    }
  }


};
