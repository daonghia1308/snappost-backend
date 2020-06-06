module.exports = {


  friendlyName: 'Create',


  description: 'Create post.',


  inputs: {
    content: { type: 'string'},
    images: {type: 'json'},
    mentions: {type: 'json'},
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
      let {content, images, mentions} = inputs;
      let {user} = this.req;
      let createPost = await Post.create({
        postBy: user.id,
        content, 
        images, 
        mentions, 
        shareBy: 0
      }).fetch();
      return exists.success({
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
