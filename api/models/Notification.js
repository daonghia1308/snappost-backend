/**
 * Notification.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  TYPE: {
    notify: 1,
    friendRequest: 2
  },
  attributes: {
    title: {
      type: 'string'
    },
    content: {
      type: 'string'
    },
    userId: {
      model: "User"
    },
    url: {
      type: "string"
    },
    isRead: {
      type: 'boolean',
      defaultsTo: false
    },
    type: {
      type: "number"
    }
  },

};

