module.exports = {


  friendlyName: 'Verify mail',


  description: '',


  inputs: {

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
      let { id } = this.req.params;

      let userInfo = await userInfo.findOne(id)

      if (!userInfo) return exits.fail({
        code: 404,
        message: "User does not exist"
      })

      await User.updateOne(id, {
        verifyMail: true
      })

      return exits.success({
        code: 0,
        message: "You has been verified!!!"
      })

    } catch (error) {
      return exits.serverError({
        code: 500,
        error: error.message,
        message: "System encouter a problem. Try again."
      })
    }

  }


};
