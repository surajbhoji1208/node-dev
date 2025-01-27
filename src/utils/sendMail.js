const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Can be changed to another email provider (e.g., Outlook, Yahoo)
  auth: {
    user: 'surajbhoji1208@gmail.com',  // Replace with your email
    pass: 'SuRaj@1208'    // Use App password for Gmail for security
  }
});

// Dynamic send email function
const sendEmail = (to, subject, text, html = '', attachments = []) => {
  const mailOptions = {
    from: 'surajbhoji1208@gmail.com',   // Sender address
    to: to,                         // Recipient email (dynamic)
    subject: subject,               // Subject line (dynamic)
    text: text,                     // Plain text body (dynamic)
    html: html,                     // HTML body (optional, dynamic)
    attachments: attachments        // Attachments (optional, dynamic)
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });
};

// Example Usage
const to = 'recipient-email@example.com';  // Dynamic recipient
const subject = 'Dynamic Email Subject';
const text = 'This is a dynamically sent email.';
const html = '<h1>This is a dynamic HTML email!</h1>';
const attachments = [
  {
    filename: 'example.txt',
    path: './example.txt'
  }
];

// Send a dynamic email
sendEmail(to, subject, text, html, attachments);
