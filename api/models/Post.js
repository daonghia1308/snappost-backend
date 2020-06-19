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
    images: {
      type: 'json',
      defaultsTo: []
    },
    videos: {
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
    shareBy: {
      model: 'User'
    },
    totalLike: {
      type: 'number'
    },
    ranking: {
      type: 'number',
      defaultsTo: 1500
    }

  },

};

