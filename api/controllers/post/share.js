module.exports = {


  friendlyName: 'Share',


  description: 'Share post.',


  inputs: {
    content: { type: 'string' },
    mentions: { type: 'json' },
    sharedPost: { type: 'string' }
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
      let { content, mentions, sharedPost } = inputs;
      let { user } = this.req;
      if (!content || !sharedPost) {
        return exits.fail({
          code: 400,
          message: "Missing data body"
        })
      }

      let sharePostInfo = await Post.findOne(sharedPost).populate("postBy");
      if (!sharePostInfo) {
        return exits.fail({
          code: 404,
          message: "Post not found"
        })
      }

      let createdPost = await Post.create({
        postBy: user.id,
        content,
        mentions,
        isShared: true,
        sharedPost
      }).fetch();

      createdPost.postBy = user;
      createdPost.islike = false;
      createdPost.totalComment = 0;
      createdPost.totalShare = 0;
      createdPost.sharedPost = sharePostInfo;

      return exits.success({
        code: 0,
        data: createdPost
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
