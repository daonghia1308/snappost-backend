/**
 * Post.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    content: {
      type: 'string',
      columnType: 'text CHARACTER SET utf8mb4'
    },
    upload: {
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
    isShared: {
      type: 'boolean',
      defaultsTo: false
    },
    totalLike: {
      type: 'number'
    },
    ranking: {
      type: 'number',
      defaultsTo: 1500
    },
    sharedPost: { model: 'Post' }

  },
  customToJSON: function () {
    this.comments = []
    return this;
  },

};

