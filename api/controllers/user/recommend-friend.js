
module.exports = {


  friendlyName: 'Recomment friend',


  description: '',


  inputs: {
    limit: {
      type: 'number'
    },
    page: {
      type: 'number'
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
      let { user } = this.req;
      let { limit, page } = inputs;
      let data = new Set();
      let friendOfFof;
      limit = limit || 5;
      page = page || 1;
      let offset = (page - 1) * limit;
      let friends = await User.getFriends(user.id);
      friends = friends.map((e) => { return e.id });
      let fof = await User.find({
        where: {
          or: [
            { school: { contains: user.school } },
            { company: { contains: user.company } },
            { currentLocation: { contains: user.currentLocation } },
            { bornIn: { contains: user.bornIn } },
            { school: { startsWith: user.school } },
            { company: { startsWith: user.company } },
            { currentLocation: { startsWith: user.currentLocation } },
            { bornIn: { startsWith: user.bornIn } }
          ],
        }
      })
      if (fof.length > 0) {
        for (let i = 0; i < fof.length; i++) {
          if (fof[i].id == user.id) {
            continue;
          }
          let isRequested = await FriendRequest.findOne({
            from: fof[i].id,
            to: user.id
          })
          let isSentRequest = await FriendRequest.findOne({
            from: user.id,
            to: fof[i].id
          })

          if (isRequested || isSentRequest) {
            continue;
          } else {
            if (!friends.includes(fof[i].id)) {
              let duplicateFriends = new Set();
              friendOfFof = await User.getFriends(fof[i].id);
              let numberOfFofId = friendOfFof.map((e) => { return e.id });
              // let duplicateFriends = friends.filter((e) => { return numberOfFofId.includes(e.id) });
              friends.map((e) => {
                if (numberOfFofId.includes(e)) {
                  duplicateFriends.add(e)
                }
              })
              fof[i].mutualFriend = duplicateFriends.size;
              data.add(fof[i]);
            }
          }
        }
      }

      return exits.success({
        code: 0,
        data: [...data]
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
