const FileUpload = require("../../models/FileUpload");
const Message = require("../../models/Message");

module.exports = {


  friendlyName: 'Send',


  description: 'Send chat.',


  inputs: {
    chatId: {
      type: 'string'
    },
    message: {
      type: 'string'
    },
    upload: {
      type: 'json'
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
      let { user } = this.req;
      let { chatId, message, upload } = inputs;
      // let fileUrl = [];
      let fileUploadId = [];
      if (!chatId || !message) {
        return exits.fail({
          code: 1,
          message: "Missing chatId, message and uploads!"
        })
      }
      let findChat = await Chat.findOne(chatId);
      if (!findChat) {
        return exits.fail({
          code: 1,
          message: "chatId not exist!"
        })
      }
      // if (uploads.length > 0) {
      //   for (let i = 0; i < uploads.length; i++) {
      //     let fileInfo = await FileUpload.findOne({ id: uploads[i].id })
      //     fileUrl.push(sails.config.globals.imageUrl + fileInfo.serverFileDir + "/" + fileInfo.serverFileName)
      //   }
      // }
      if (uploads.length > 0) {
        fileUploadId = upload.map((e) => { return e.id })
      }
      let data = {
        message,
        chatId,
        upload
      }
      await sails.helpers.socket.blast.with({
        arrayId: findChat.roomUser,
        event: `message`,
        data
      })
      await Message.creare({
        chatId,
        upload,
        message,
        user: user.id
      })
      await FileUpload.update({ id: fileUploadId }).set({ place: 2 });
      return exits.success({
        code: 0,
        message: "Send message success!"
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        error: error.message,
        message: "System error!"
      })
    }


  }


};
