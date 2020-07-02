
module.exports = {


  friendlyName: 'Change image',


  description: '',


  inputs: {
    type: { type: "string" },
    image: { type: "ref" }
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
      let { type, image } = inputs;
      if (type == "avatar") {
        await User.updateOne(user.id, {
          avatar: image.url
        })
        user.avatar = image.url
      } else {
        await User.updateOne(user.id, {
          wallImage: image.url
        })
        user.wallImage = image.url
      }

      let createPost = await Post.create({
        postBy: user.id,
        content: "",
        upload: [image],
        mentions: [],
        shareBy: null,
        action: type == 'avatar' ? " has changed avatar." : " has changed wall image."
      }).fetch()

      let token = await sails.helpers.jwt.sign(user)

      createPost.postBy = user;
      createPost.islike = false;
      createPost.totalComment = 0;
      createPost.totalShare = 0;

      return exits.success({
        code: 0,
        data: createPost,
        token,
        user,
        message: `${type == "avatar" ? "Avatar changed successfully" : "Wall image changed successfully"}`
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
