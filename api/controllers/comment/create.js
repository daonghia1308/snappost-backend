module.exports = {


  friendlyName: 'Create',


  description: 'Create comment.',


  inputs: {
    content: { type: 'string' },
    postId: { type: 'string' },
    parentId: { type: 'string', description: "Id comment parent" }
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
      let { content, postId, parentId } = inputs;
      let { user } = this.req;
      let parent;
      if (!content || !postId) {
        return exits.fail({
          code: 1,
          message: 'Missing content or postId!'
        })
      }
      parent = parentId ? parentId : '0';
      let data = {
        content,
        user: user.id,
        parent,
        post: postId
      }
      let comment = await Comment.create(data).fetch();
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
