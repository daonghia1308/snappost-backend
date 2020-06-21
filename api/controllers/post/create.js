module.exports = {


  friendlyName: 'Create',


  description: 'Create post.',


  inputs: {
    content: { type: 'string' },
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
      let { content, upload, mentions } = inputs;
      let { user } = this.req;
      if (!content && !images) {
        return exits.fail({
          code: 1,
          message: 'Missing data body!'
        })
      }
      let createPost = await Post.create({
        postBy: user.id,
        content,
        upload,
        mentions,
        shareBy: null
      }).fetch();
      return exits.success({
        code: 0,
        data: createPost
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        err: error,
        message: "System error!"
      })
    }
  }


};
