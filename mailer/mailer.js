const nodemailer = require('nodemailer');

const sendConfirmationCode = (user) => {
  return new Promise(async (resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const htmlContent = `
      <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #6c757d; border-radius: 10px; background-color: #f8f9fa;">
        <h2 style="color: #007bff;">Hello, ${user.name.split(' ')[0]}</h2>
        <p style="color: #343a40;">Please reset your password using this code:</p>
        <div style="background-color: #17a2b8; padding: 10px; border-radius: 5px; text-align: center;">
          <h4 style="color: #ffffff; margin: 0; font-size: 24px;">${
            user.forgotPasswordConfirmationCode
          }</h4>
        </div>
        <p style="color: #343a40; margin-top: 20px;">Thank you for using our service!</p>
      </div>
    `;

    const message = {
      from: 'Nodejs API App',
      to: user.email,
      subject: 'Reset Password Code for BANAO MERN - TASK 2 API',
      html: htmlContent,
    };

    transporter.sendMail(message, (err, info) => {
      if (err) {
        reject(err);
        console.error('Error sending confirmation code email:', err);
      } else {
        resolve(info);
      }
    });
  });
};

module.exports = sendConfirmationCode;
