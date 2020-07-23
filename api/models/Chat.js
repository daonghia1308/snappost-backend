/**
 * Chat.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    roomUser: {
      type: 'json',
      defaultsTo: [],
      description: "Thanh vien nhom chat"
    },
    manager: {
      type: 'json',
      defaultsTo: []
    },
    uploads: {
      type: "json",
      defaultsTo: []
    },
    roomName: {
      type: 'string'
    }

  },

};

