module.exports = {


  friendlyName: 'Create',


  description: 'Create comment.',


  inputs: {
    content: { type: 'string' },
    postId: { type: 'string' },
    parentId: { type: 'string', description: "Id comment parent" },
    upload: { type: 'json' },
    mentions: { type: 'json' },
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
      let { content, postId, parentId, upload, mentions } = inputs;
      let { user } = this.req;
      let parent;
      if (!content || !postId) {
        return exits.fail({
          code: 1,
          message: 'Missing content or postId!'
        })
      }
      let userInfo = await User.findOne(user.id)
      parent = parentId ? parentId : '0';
      let data = {
        content,
        user: user.id,
        parent,
        post: postId,
        upload,
        mentions
      }
      let comment = await Comment.create(data).fetch();
      comment.user = userInfo;
      comment.reply = [];
      comment.totalReply = 0;
      await sails.helpers.notify.send.with({ title: "test", content: "test", userId: user.id }) 
      return exits.success({
        code: 0,
        message: 'Comment created successfully!',
        data: comment
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        error: error.message,
        message: "System encouter a problem. Try again."
      })
    }
  }
};
