const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Can be changed to another email provider (e.g., Outlook, Yahoo)
  auth: {
    user: 'surajbhoji1111@gmail.com',  // Replace with your email
    pass: 'fymt hnah cwme eizt'    // Use App password for Gmail for security
  }
});

// Dynamic send email function
 const sendEmail = async (mailData) => {
  const mailOptions = {
    to: mailData.to,                         // Recipient email (dynamic)
    subject: mailData.subject,               // Subject line (dynamic)
    text: mailData.text,                     // Plain text body (dynamic)
    html: mailData.html,                     // HTML body (optional, dynamic)
  };

  // Send email
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });
};
module.exports = {sendEmail}

