const nodemailer = require("nodemailer");

// Create a function to send emails
const sendEmail = async (toEmail, subject, htmlContent, attachment) => {
  try {
    let transporter = nodemailer.createTransport({
      name: 'nilegmp.com',
      host: "smtp-relay.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      ignoreTLS: true,
    });

    // For Localhost 
    // let transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "ks615044@gmail.com", // Update with your Gmail email
    //     pass: "yfzadtumtklusmio", // Update with your Gmail password or an app-specific password
    //   },
    // });

    let message = {
      from: '"Nile Market-Place" <Info@nilegmp.com>', // Add both name and email address
      to: toEmail,
      subject: subject,
      html: htmlContent,
      attachments: attachment ? [{ filename: 'wallet_statement.pdf', content: attachment, encoding: 'base64' }] : undefined,
    };

    await transporter.verify();
    await new Promise((resolve, reject) => {
      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.error('Error sending email:', err);
          reject({ success: false, message: 'Error sending email' });
        } else {
          // Log information about the sent email
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          resolve({ success: true, message: `Email sent successfully ${info}` });
        }
      });
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: error };

  }
};

// Example usage:
// sendEmail('recipient@example.com', 'Test Email', 'This is a test email.');

module.exports = sendEmail;
