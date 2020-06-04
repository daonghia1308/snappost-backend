/**
 * Post.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'string',
      columnType: 'text CHARACTER SET utf8mb4'
    },
    content: {
      type: 'string',
      columnType: 'text CHARACTER SET utf8mb4'
    },
    images: {
      type: 'json',
      defaultsTo: []
    },
    files: {
      type: 'json',
      defaultsTo: []
    },
    mentions: {
      type: 'json',
      defaultsTo: []
    },
    postBy: {
      model: 'User'
    },
    isShare: {
      type: 'boolean',
      defaultsTo: false
    },
    shareBy: {
      model: 'User'
    }
  },

};

