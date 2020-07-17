const { finished } = require("nodemailer/lib/xoauth2");

module.exports = {


  friendlyName: 'Get',


  description: 'Get notification.',


  inputs: {
    limit: {
      type: "number"
    },
    skip: {
      type: "number"
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
      let { limit, skip } = inputs;
      let { user } = this.req;
      limit = limit || 10;
      skip = skip || 0;
      let findNoti = await Notification.find({
        where: {
          userId: user.id
        },
        limit,
        skip,
        sort: ["created_at DESC"]
      }).populate("userId")
      let totalUnReadNotice = await Notification.count({ isRead: false, userId: user.id });
      let totalNotice = await Notification.count({ userId: user.id });
      let isMore;
      if (totalNotice / (skip + limit) > 1) {
        isMore = true;
      } else {
        isMore = false;
      }
      return exits.success({
        code: 0,
        data: findNoti,
        unReadNotice: totalUnReadNotice,
        isMore
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        err: error,
        message: "System error!"
      })
    }
  }


};
