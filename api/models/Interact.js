/**
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  TYPE: {
    COMMENT: 1,
    LIKE: 2,
    MENTION: 3,
    SHARE: 4,
  },
  attributes: {
    user: {
      model: 'User'
    },
    post: {
      model: 'Post'
    },
    type: {
      type: 'number',
      description: 'type of action'
    }
  },

};

