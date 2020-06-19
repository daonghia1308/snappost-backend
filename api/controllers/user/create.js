module.exports = {


  friendlyName: 'Create',


  description: 'Create user.',


  inputs: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },
    gender: {
      type: 'number'
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
      let { firstName, lastName, email, password, phone, gender } = inputs;
      let findUser = await User.findOne({ email: email });
      if (findUser) {
        return exits.fail({
          code: 1,
          message: "User has existed!"
        })
      }
      let hashPassword = await sails.helpers.password.hash(password);
      let data = {
        firstName,
        lastName,
        email,
        password: hashPassword,
        phone,
        gender,
        avatar: gender === 0 ? "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQGhHgm5CxH4GADOw8USGukz3gAT58YUzjk8i_75HC41qMAWC9i&usqp=CAU" : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRUnQ1cSlkbQSBtwNr6lKDLcKXsoSkZ6PZhEIVN2XaEQcRW6lzN&usqp=CAU"
      }
      let createUser = await User.create(data).fetch();
      delete createUser.password;
      let token = await sails.helpers.jwt.sign(createUser)

      // let mailData = {
      //   email: email,
      //   subject: "Verify your account",
      //   content: `
      //     <p>Hi ${firstName} ${lastName},</p> 
      //     <p>First of all, welcome you to Snappost and to ensure that you are "human" and recently using this email, we would like you to verify your email.</p> 
      //     <p>Please click on this link to verify you: <a href="http://localhost:1337/api/user/verify-mail/${createUser.id}">here</a></p>
      //     `
      // }

      // await sails.helpers.common.sendMail(mailData);

      return exits.success({
        code: 0,
        data: createUser,
        token,
        message: "Sign up successfully!"
      })
    } catch (error) {
      return exits.serverError({
        code: 1,
        error: error.message,
        message: "System encouter a problem. Try again."
      })
    }
  }


};
