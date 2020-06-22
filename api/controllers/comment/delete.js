module.exports = {


  friendlyName: 'Delete',


  description: 'Delete comment.',


  inputs: {
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
      let { commentId } = inputs;
      if (!commentId) {
        return exits.fail({
          code: 1,
          message: 'Missing commentId!'
        })
      }
      await Comment.updateOne(commentId, { isDelete: true });
      return exits.success({
        code: 0,
        message: 'Comment deleted successfully!'
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        error: error.message,
        message: "System encouter a problem. Try again!"
      })
    }
  }


};
