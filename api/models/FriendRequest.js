/**
 * FriendRequest.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user: {
      model: 'User'
    },
    sendRequest: {
      model: 'User',
      description: "User send friend request"
    },
    status: {
      type: "number",
      description: '0: chưa accept, 1: accept, 2: reject'
    }
  },

};

