/**
 * Like.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  TYPE: {
    post: 1,
    comment: 2
  },
  attributes: {
    user: {model: 'User'},
    type: {type: 'number'}
  },

};

