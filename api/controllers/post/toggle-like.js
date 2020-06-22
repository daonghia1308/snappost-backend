module.exports = {


  friendlyName: 'Toggle like',


  description: '',


  inputs: {
    postId: { type: 'string' }
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
      let { postId } = inputs;
      let { user } = this.req;
      if (!postId) {
        return exits.fail({
          code: 1,
          message: 'Missing postId!'
        })
      }
      let findPost = await Post.findOne({ id: postId });
      if (!findPost) {
        return exits.fail({
          code: 1,
          message: 'Post Id not exist!'
        })
      }
      let findPostLike = await Like.create({
        user: user.id,
        idLiked: postId,
        type: 1
      })
      if (findPostLike) {
        await Like.destroy({
          id: findPostLike.id
        });
        let newTotalLike = findPost.totalLike - 1;
        await Post.update({ id: postId }).set({ totalLike: newTotalLike });
      }
      else {
        await Like.create({
          userId: user.id,
          type: 1,
          idLiked: postId
        })
        let newTotalLike = findPost.totalLike + 1;
        await Post.update({ id: postId }).set({ totalLike: newTotalLike });
      }
      return exits.success({
        code: 0,
        message: 'Success!'
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
