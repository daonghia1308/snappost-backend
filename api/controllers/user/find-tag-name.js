module.exports = {


  friendlyName: 'Find tag name',


  description: '',


  inputs: {
    name: { type: 'string' },
    skip: { type: 'number' },
    limit: { type: 'number' }
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
      let { name, skip, limit } = inputs;
      let { user } = this.req;
      if (!name) {
        return exits.fail({
          code: 1,
          message: 'Missing name!'
        })
      }
      let friends = await User.getFriends(user.id);
      let filteredFriends = friends.filter((e) => {
        let fullName = e.firstName + ' ' + e.lastName;
        return fullName.includes(name)
      })
      limit = limit || 20;
      skip = skip || 0;
      // friends = friends.slice(skip, limit + skip);
      return exits.success({
        code: 0,
        data: filteredFriends
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        error: error.message,
        message: 'System error!'
      })
    }
  }


};
