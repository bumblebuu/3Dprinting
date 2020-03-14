const sender = 'beyond.paper.webshop@gmail.com'; // The emailto use in sending the email
// (Change the @ symbol to %40 or do a url encoding )
const password = 'bey0ndpaper$'; // password of the email to use

const nodeMailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

// const hbs = require('nodemailer-express-handlebars');
// const emailTemplates = require('email-templates');

const transporter = nodeMailer.createTransport(smtpTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: sender,
    pass: password,
  },
}));


module.exports = transporter;

