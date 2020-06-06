module.exports = {


  friendlyName: 'Get post detail',


  description: '',


  inputs: {
    id: { type: 'string'}
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
      let { id } = inputs;
      if (!id) {
        return exits.fail({
          code: 1,
          message: 'Missing post id!'
        })
      }
      let findPost = await Post.findOne(id);
      if (!findPost) {
        return exits.fail({
          code: 1,
          message: 'Post not found'
        })
      }
      return exits.success({
        code: 0,
        data: findPost
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
