module.exports = {


  friendlyName: 'Delete',


  description: 'Delete post.',


  inputs: {
    id: { type: 'string' }
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
      await Post.destroy(id);
      return exits.success({
        code: 0,
        message: 'Delete post success!'
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
