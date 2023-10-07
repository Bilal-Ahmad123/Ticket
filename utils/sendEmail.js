var nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    secure: false,

    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
    from: process.env.SMPT_MAIL,
  });

  const mailOptions = {
    to: options.email,
    subject: options.Subject,
    text: options.message,
  };
  transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
