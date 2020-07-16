module.exports = {


  friendlyName: 'Send',


  description: 'Send notify.',


  inputs: {
    title: {
      type: 'string'
    },
    content: {
      type: 'string'
    },
    userId: {
      type: 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    let { title, content, userId } = inputs;
    sails.sockets.blast('notification', {
      title,
      content,
      userId
    });
  }


};

