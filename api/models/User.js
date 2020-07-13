/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    firstName: {
      type: 'string',
      columnType: 'text CHARACTER SET utf8mb4'
    },
    lastName: {
      type: 'string',
      columnType: 'text CHARACTER SET utf8mb4'
    },
    email: {
      type: 'string',
      isEmail: true,
      unique: true,
      required: true
    },
    password: {
      type: 'string'
    },
    dob: {
      type: "string"
    },
    phone: {
      type: 'string'
    },
    gender: {
      type: 'number'
    },
    avatar: {
      type: 'string'
    },
    verifyMail: {
      type: "boolean",
      defaultsTo: false
    },
    facebookId: {
      type: 'string'
    },
    googleId: {
      type: 'string'
    },
    wallImage: {
      type: 'string'
    },
    province: {
      type: 'number'
    },
    ward: {
      type: 'number'
    },
    country: {
      type: 'number'
    },
    isActive: {
      type: 'boolean',
      defaultsTo: true
    },
    online: {
      type: 'boolean',
      defaultsTo: false
    },
    isBan: {
      type: 'boolean',
      defaultsTo: false
    },
    isNewUser: {
      type: 'boolean',
      defaultsTo: true
    },
    isVerify: {
      type: 'boolean',
      defaultsTo: false
    },
    relationshipDetailId: {
      model: "relationshipdetail"
    },
    nickname: {
      type: 'string',
      columnType: 'text CHARACTER SET utf8mb4'
    },
    bornIn: { type: "string" },
    currentLocation: { type: "string" },
    school: { type: "string" },
    company: { type: "string" },
    bio: { type: "string" }
  },
  customToJSON: function () {
    // Return a shallow copy of this record with the password and ssn removed.
    return _.omit(this, ['password', 'facebookId', 'googleId'])
  },
  getFriends: async (userId) => {
    let rs = await cache.get(`userFriend_${userId}`);
    let data = [];
    if (rs) {
      return rs
    }
    else {
      let friends = await RelationshipDetail.find({
        type: 1,
        or: [
          { user: userId },
          { otherUser: userId }
        ],
      }).populate(['user', 'otherUser']);
      friends.map((e) => {
        if (e.user['id'] == userId) {
          data.push(e.otherUser)
        }
        else if (e.otherUser['id'] == userId) {
          data.push(e.user)
        }
      })
      await cache.set(`userFriend_${userId}`, data);
      return data
    }
  },
  refreshFriendCache: async (userId) => {
    let data = [];
    let friends = await RelationshipDetail.find({
      type: 1,
      or: [
        { user: userId },
        { otherUser: userId }
      ],
    }).populate(['user', 'otherUser']);
    friends.map((e) => {
      if (e.user['id'] == userId) {
        data.push(e.otherUser)
      }
      else if (e.otherUser['id'] == userId) {
        data.push(e.user)
      }
    })
    await cache.set(`userFriend_${userId}`, data);
  },
  getNumberOfFriendMutual: async (userId, friendId) => {
    let userFriendList = await User.getFriends(userId);
    userFriendList = userFriendList.map((e) => { return e.id });
    let compareUserFriendList = await User.getFriends(friendId);
    let mutualFriend = compareUserFriendList.map((e) => { return userFriendList.includes(e.id) });
    return mutualFriend.length;
  }
};


