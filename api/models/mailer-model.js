const nodemailer = require("nodemailer");
let mailer;

function getMailer() {
    if(!mailer) {
        mailer = nodemailer.createTransport( {
            host: "smtp-mail.outlook.com",
            secure: false,
            auth: {
                user: "conciqueMail",
                pass: "mailPassword",
            }
        });
    }
    return mailer;
}

module.exports = {getMailer}
