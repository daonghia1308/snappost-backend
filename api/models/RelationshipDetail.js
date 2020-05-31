/**
 * RelationshipDetail.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user: {
      model: 'User'
    },
    idAction: {
      type: 'number',
      description: 'Id của bài like, share, người dùng ...'
    },
    relationshipId: {
      model: 'Relationship'
    },
  },

};

