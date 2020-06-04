/**
 * RelationshipDetail.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  TYPE: {
    FRIEND: 1,
    SINGLE: 2,
    ISMARRIED: 3,
    DATING: 4,
    ISDEAD: 5,
    FOLLOWED: 6
  },
  attributes: {
    user: {
      model: 'User'
    },
    otherUser: {  
      model: 'User',
      description: 'Id người dùng với hành động'
    },
    type: {
      type: 'number',
      description: 'type of action'
    },
  },

};

