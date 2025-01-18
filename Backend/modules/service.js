import transporter from './transporter.js';

/**
 * Sends an email using the transporter.
 * @param {Object} email - The email details.
 * @param {string} email.to - Recipient's email address.
 * @param {string} email.subject - Email subject.
 * @param {string} email.html - Email body in HTML.
 * @returns {Promise<void>}
 */
const sendEmail = async (email) => {
  try {
    await transporter.sendMail(email);
  } catch (error) {
    throw new Error(`Failed to send email to ${email.to}: ${error.message}`);
  }
};

export { sendEmail };