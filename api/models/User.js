/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    email: {
      type: 'string',
      isEmail: true,
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    dob: {
      type: "string"
    },
    phone: {
      type: 'string'
    },
    gender: {
      type: 'number'
    },
    avatar: {
      type: 'string'
    },
    facebookId: {
      type: 'string'
    },
    googleId: {
      type: 'string'
    },
    wallImage: {
      type: 'string'
    },
    province: {
      type: 'number'
    },
    ward: {
      type: 'number'
    },
    country: {
      type: 'number'
    },
    isActive: {
      type: 'boolean',
      defaultsTo: true
    },
    online: {
      type: 'boolean',
      defaultsTo: false 
    },
    isBan: {
      type: 'boolean',
      defaultsTo: false 
    },
    isNewUser: {
      type: 'boolean',
      defaultsTo: true
    },
    isVerify: {
      type: 'boolean',
      defaultsTo: false
    },
    relationshipDetailId: {
      model: "relationshipdetail"
    },
    nickname: {
      type: 'string'
    }
  },

};

