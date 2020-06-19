const moment = require('moment');
const nodemailer = require('nodemailer')

module.exports = {


    friendlyName: 'Send mail',


    description: '',


    inputs: {
        data: {
            type: 'ref'
        }
    },


    exits: {


    },


    fn: async function (inputs, exits) {

        let { data } = inputs;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            auth: {
                user: "quanndh1810@gmail.com",
                pass: "quannguyen123"
            },
            ignoreTLS: true
        });

        await transporter.sendMail({
            from: 'quanndh1810@gmail.com',
            to: data.email,
            subject: data.subject,
            text: ``,
            html: `<div> 
        ${data.content}
        <p>Best regards from Snappost.</p>
        </div>`
        });

        // await SendMailLog.create({ data: data });

        return exits.success()
    }


};

