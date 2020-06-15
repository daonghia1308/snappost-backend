const Like = require("../../models/Like");

module.exports = {


  friendlyName: 'Toggle like',


  description: '',


  inputs: {
    commentId: { type: 'string'}
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
      let {commentId} = inputs;
      if(!commentId) {
        return exits.fail({
          code: 1,
          message: 'Missing commentId!'
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
      let findCommentLike = await Like.findOne({
        userId: user.id,
        idLiked: findComment.id
      })
      if(findCommentLike) {
        await Like.destroy({
          id: findCommentLike.id
        });
        let newTotalLike = findComment.totalLike - 1;
        await Comment.update({ id: commentId }).set({ totalLike: newTotalLike });
      }
      else {
        await Like.create({
          userId: user.id,
          type: 2,
          idLiked: commentId
        })
        let newTotalLike = findComment.totalLike + 1;
        await Comment.update({ id: commentId }).set({ totalLike: newTotalLike });
      }
      return exits.success({
        code: 0,
        message: 'Success'
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        error: error.message,
        message: 'System encouter a problem. Try again.'
      })
    }
  }


};
