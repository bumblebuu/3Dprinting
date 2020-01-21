const sender = 'beyond.paper.webshop@gmail.com'; // The emailto use in sending the email
// (Change the @ symbol to %40 or do a url encoding )
const password = 'bey0ndpaper$'; // password of the email to use

const nodeMailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const hbs = require('nodemailer-express-handlebars');
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

const handlebarOptions = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: './templates/subscribed',
    layoutsDir: './templates/subscribed',
    defaultLayout: 'newsletter.hbs',
  },
  viewPath: './templates/subscribed',
  extName: '.hbs',
};

transporter.use('compile', hbs(handlebarOptions));


const mailOptions = {
  from: 'beyond.paper.webshop@gmail.com',
  // to: 'grosics13@gmail.com',
  subject: 'Sending Email using Node.js[nodemailer]',
  text: 'That was easy!',
  send: true,
  template: 'newsletter',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Email sent: ${info.response}`);
  }
});