/**
 * FriendRequest.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    from: {
      model: 'User'
    },
    to: {
      model: 'User',
      description: "User send friend request"
    }
  },

};

