module.exports = {


  friendlyName: 'Login social network',


  description: '',


  inputs: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    avatar: {
      type: 'string'
    },
    type: {
      type: 'string'
    },
    id: {
      type: 'string'
    }
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
      let { name, email, avatar, type, id } = inputs;
      let idFriends = [];
      if (!name || !email || !avatar || !id || !type) {
        return exits.fail({
          code: 400,
          message: "Missing data body!"
        })
      }
      let firstName = name.split(" ")[0];
      let lastName = name.split(" ")[1] ? name.split(" ")[1] : "";
      if (type == "facebook") {
        let findUser = await User.findOne({ facebookId: id })
        if (findUser) {
          let totalFriend = await User.getFriends(findUser.id);
          totalFriend.map((e) => {
            idFriends.push(e.id);
          })
          let onlineFriends = await User.find({
            id: idFriends,
            online: true
          })
          findUser.totalFriend = totalFriend.length;
          findUser.onlineFriends = onlineFriends;
          await User.update({ id: findUser.id }).set({ online: true });
          return exits.success({
            code: 200,
            data: findUser
          })
        }
        let createUser = await User.create({
          firstName,
          lastName,
          email,
          avatar,
          facebookId: id
        }).fetch();
        createUser.totalFriend = 0;
        createUser.onlineFriends = [];
        return exits.success({
          code: 200,
          data: createUser,
          message: "Create user success!"
        })
      }
      else if (type == 'google') {
        let findUser = await User.findOne({ googleId: id })
        if (findUser) {
          let totalFriend = await User.getFriends(findUser.id);
          totalFriend.map((e) => {
            idFriends.push(e.id);
          })
          let onlineFriends = await User.find({
            id: idFriends,
            online: true
          })
          findUser.totalFriend = totalFriend.length;
          findUser.onlineFriends = onlineFriends
          await User.update({ id: findUser.id }).set({ online: true });
          return exits.success({
            code: 200,
            data: findUser
          })
        }
        let createUser = await User.create({
          firstName,
          lastName,
          email,
          avatar,
          googleId: id
        }).fetch();
        createUser.totalFriend = 0;
        createUser.onlineFriends = [];
        return exits.success({
          code: 200,
          data: createUser,
          message: "Create user success!"
        })
      }

    } catch (error) {
      return exits.serverError({
        code: 500,
        error: error.message,
        message: "System error!"
      })
    }

  }


};
