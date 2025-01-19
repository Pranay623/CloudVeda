import { sendEmail } from '../modules/service.js';

const sendNewYearWishes = async (req, res) => {
  try {
    // Extract the list of emails and full names from the request body
    const { recipients } = req.body;

    if (!recipients || recipients.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Recipients are required.',
      });
    }

    let successCount = 0;
    let failureCount = 0;

    // Loop through the recipients and send the email to each one
    for (const recipient of recipients) {
      const { email, fullName } = recipient;

      if (!email || !fullName) {
        failureCount++;
        console.error(`Invalid recipient data: ${JSON.stringify(recipient)}`);
        continue;
      }

      try {
        await sendEmail({
          from: process.env.SMTP_EMAIL, // Sender email (from environment)
          to: email, // Recipient email
          subject: `Thank You! Dear ${fullName} from CloudVeda`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f7fc; border-radius: 8px;">
  <div style="text-align: left; margin-bottom: 30px;">
    <img src="YOUR_LOGO_URL" alt="Logo" style="width: 100px; height: auto;" />
  </div>
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="font-size: 28px; color: #4CAF50;">Your Ayurvedic Health Report</h1>
    <p style="font-size: 16px; color: #555;">Based on your analysis, here are personalized insights to help maintain your health balance.</p>
  </div>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <h2 style="font-size: 24px; color: #333;">Health Insights</h2>
    <ul style="font-size: 16px; color: #555; padding-left: 20px;">
      <li><strong>Dark Circles:</strong> Present (Indicates *Vata* imbalance; improve sleep and hydration).</li>
      <li><strong>Spots:</strong> Detected (*Pitta* imbalance; include antioxidant-rich foods).</li>
      <li><strong>Skin Texture:</strong> Smooth (Healthy *Kapha* maintained).</li>
      <li><strong>Hair Coverage:</strong> 66.47% (*Vata* remedies suggested; consider scalp massages).</li>
      <li><strong>Nail Color:</strong> Slightly dark (*Vata* balancing foods recommended).</li>
    </ul>
    <h3 style="font-size: 20px; color: #333;">Recommendations</h3>
    <p style="font-size: 16px; color: #555;">
      <strong>For Vata:</strong> Warm, spiced foods (e.g., ginger) and regular oil massages.<br />
      <strong>For Pitta:</strong> Cooling foods (e.g., cucumber, mint) and avoid fried items.<br />
      <strong>For Kapha:</strong> Light, dry foods and regular exercise.
    </p>
  </div>
  <div style="text-align: center; margin-top: 30px; font-size: 14px; color: #999;">
    <p>This report is a preliminary assessment. For detailed advice, consult an Ayurvedic expert.</p>
    <p>If you have any questions, feel free to <a href="mailto:support@yourplatform.com" style="color: #4CAF50;">contact us</a>.</p>
  </div>
</div>

          `,
        });
        successCount++;
        console.log(`Email sent successfully to ${email}`);
      } catch (error) {
        failureCount++;
        console.error(`Failed to send email to ${email}:`, error.message);
      }
    }

    // Return the status of the email sending process
    res.status(200).json({
      success: true,
      message: 'Completed sending New Year wishes',
      stats: {
        total: recipients.length,
        successful: successCount,
        failed: failureCount,
      },
    });
  } catch (error) {
    console.error('Error in sendNewYearWishes:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending New Year wishes',
      error: error.message,
    });
  }
};

export { sendNewYearWishes };
