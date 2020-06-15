module.exports = {


  friendlyName: 'Edit comment',


  description: '',


  inputs: {
    commentId: {type: 'string'},
    content: {type: 'string'}
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
      let {commentId, content} = inputs;
      if (!commentId || !content) {
        return exits.fail({
          code: 1,
          message: 'Missing commentId or content!'
        })
      }
      let findComment = await Comment.findOne({
        id: commentId
      })
      if(!findComment) {
        return exits.fail({
          code: 1,
          message: 'Comment not found!'
        })
      }
      await Comment.updateOne(commentId, {content})
      return exits.success({
        code: 0,
        message: 'Comment updated successfully!'
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        message: 'System error!'
      })
    }
  }


};
