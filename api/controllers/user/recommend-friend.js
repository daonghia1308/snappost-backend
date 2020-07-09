const toSlug = require("../../services/toSlug");

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
            // { user: { in: friends } },
            // { otherUser: { in: friends } },
            { school: { contains: user.school } },
            { company: { contains: user.company } },
            { currentLocation: { contains: user.currentLocation } },
            { bornIn: { contains: user.bornIn } },
            { school: { contains: user.school.toLowerCase() } },
            { company: { contains: user.company.toLowerCase() } },
            { currentLocation: { contains: user.currentLocation.toLowerCase() } },
            { bornIn: { contains: user.bornIn.toLowerCase() } },
            { school: { contains: toSlug(user.school.toLowerCase()) } },
            { company: { contains: toSlug(user.company.toLowerCase()) } },
            { currentLocation: { contains: toSlug(user.currentLocation.toLowerCase()) } },
            { bornIn: { contains: toSlug(user.bornIn.toLowerCase()) } },
            { school: { contains: toSlug(user.school) } },
            { company: { contains: toSlug(user.company) } },
            { currentLocation: { contains: toSlug(user.currentLocation) } },
            { bornIn: { contains: toSlug(user.bornIn) } }
          ],
          // type: 1
        },
        limit: limit,
        skip: offset
      })
      // .populate(['user', 'otherUser'])// friend of friend
      if (fof.length > 0) {
        for (let i = 0; i < fof.length; i++) {
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
      data.forEach((e) => {
        if (e.id == user.id) {
          data.delete(e)
        }
      })
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
