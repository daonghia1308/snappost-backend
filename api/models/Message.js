/**
 * Message.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    chatId: {
      model: "Chat"
    },
    message: {
      type: 'string'
    },
    upload: {
      type: "json",
      defaultsTo: []
    },
    user: {
      model: "User"
    }
  },

};

