module.exports = {


  friendlyName: 'Update',


  description: 'Update user.',


  inputs: {
    company: { type: "string" },
    school: { type: "string" },
    currentLocation: { type: "string" },
    bornIn: { type: "string" },
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
      let { user } = this.req
      let { company, school, currentLocation, bornIn } = inputs;
      await User.updateOne(user.id, {
        company, school, currentLocation, bornIn
      })
      let userInfo = await User.findOne(user.id)
      return exits.success({
        code: 0,
        message: "Successfully updated",
        data: userInfo
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
