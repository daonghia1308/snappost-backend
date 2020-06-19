module.exports = {


  friendlyName: 'Edit',


  description: 'Edit post.',


  inputs: {
    postId: { type: 'string' },
    content: { type: 'string' },
    images: { type: 'json' },
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
      let findPost = await Post.findOne({id: postId});
      if(!findPost) {
        return exits.fail({
          code: 1,
          message: 'Post is not exists!'
        })
      }
      await Post.update({id: postId}).set({
        content,
        images,
        mentions
      });
      return exits.success({
        code: 0,
        message: 'Post updated'
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        message: 'System error!'
      })
    }
  }


};
