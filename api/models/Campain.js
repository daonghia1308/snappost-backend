/**
 * Campain.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  TYPE: {
    premium: 1,
    nomarl: 2
  },
  QUOTA: { // dinh muc
    premium: '200$',
    normal: '50$'
  },
  attributes: {
    name: { type: 'string' },
    avatar: { type: 'string' },
    content: { type: 'string' },
    images: { type: 'json', defaultsTo: []},
    end: {type: 'string'},
    totalView: {type: 'number', defaultsTo: 0},
    type: {type: 'number'},
    isActive: {type: 'boolean', defaultsTo: false},
    quota: {type: 'number', required: true},
    user: {model: 'User'}
  },

};

