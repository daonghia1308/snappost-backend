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
        let findUser = await User.findOne({ facebookId: id });

        if (!findUser) {
          findUser = await User.findOne({ email })
        }

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

          let token = await sails.helpers.jwt.sign(findUser);

          await User.update({ id: findUser.id }).set({ online: true, facebookId: id });
          return exits.success({
            code: 0,
            data: findUser,
            token
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
        let token = await sails.helpers.jwt.sign(createUser);

        return exits.success({
          code: 0,
          data: createUser,
          token,
        })
      }
      else if (type == 'google') {
        let findUser = await User.findOne({ googleId: id })

        if (!findUser) {
          findUser = await User.findOne({ email })
        }

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

          let token = await sails.helpers.jwt.sign(findUser);

          await User.update({ id: findUser.id }).set({ online: true, googleId: id });
          return exits.success({
            code: 0,
            data: findUser,
            token
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

        let token = await sails.helpers.jwt.sign(createUser);

        return exits.success({
          code: 0,
          data: createUser,
          token
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
