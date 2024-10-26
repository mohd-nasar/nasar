const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config({path:'./../config.env'})

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.mail_username, 
      pass: process.env.mail_password,  
    }
  });


  const mailOptions = {
    from: 'Shopiverse Team <champ12bro@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = {
    sendEmail
}