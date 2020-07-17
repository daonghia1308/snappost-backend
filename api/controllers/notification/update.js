module.exports = {


  friendlyName: 'Update',


  description: 'Update notification.',


  inputs: {
    noticeId: {
      type: "string"
    },
    type: {
      type: 'number',
      description: "1: update thong bao theo id, 2: update tat ca thong bao"
    }
  },


  exits: {
    success: {
      statusCode: 200
    },
    fail: {
      statusCode: 400
    },
    serverError: {
      statusCode: 500
    }
  },


  fn: async function (inputs, exits) {
    try {
      let { noticeId, type } = inputs;
      let { user } = this.req;
      if (type == 1) {
        if (!noticeId) {
          return exits.fail({
            code: 1,
            message: "Missing noticeId!"
          })
        }
        let findNotice = await Notification.findOne(noticeId);
        if (!findNotice) {
          return exits.fail({
            code: 1,
            message: "noticeId not exist!"
          })
        }
        await Notification.updateOne(noticeId, { isRead: true });
      } else {
        await Notification.update({ userId: user.id }).set({ isRead: true });
      }
      return exits.success({
        code: 0,
        message: "Success!"
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        error,
        message: "Server error!"
      })
    }

  }


};
