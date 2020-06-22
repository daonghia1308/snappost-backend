/**
 * Like.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    user: { model: 'User' },
    type: { type: 'number' },
    idLiked: { type: 'string', description: 'Id cua bai dang duoc like hoac comment dc like' }

  },

};

