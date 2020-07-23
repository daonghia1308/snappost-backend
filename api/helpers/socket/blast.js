module.exports = {


  friendlyName: 'Blast',


  description: 'Blast socket.',


  inputs: {
    arrayId: {
      type: 'ref'
    },
    event: {
      type: 'string'
    },
    data: {
      type: 'ref'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    try {
      let { arrayId, event, data } = inputs;
      arrayId.map((e) => {
        sails.socket.blast(`${event}-${e}`, data)
      })
    } catch (error) {
      throw new Error(error.message);
    }

  }


};

