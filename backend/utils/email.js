const nodemailer = require('nodemailer');
const config = require('../config/config');

const createTransporter = () => nodemailer.createTransport({
  host: config.emailHost,
  port: config.emailPort,
  secure: config.emailPort == 465,
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: `"GreenHarvest" <${config.emailUser}>`,
    to,
    subject,
    html,
  });
};

const contactNotificationEmail = ({ name, email, subject, message }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <div style="max-width:600px;margin:20px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#4CAF50,#2E7D32);padding:28px 32px;">
      <h1 style="color:#fff;margin:0;font-size:22px;font-weight:600;">New Contact Inquiry</h1>
      <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:14px;">GreenHarvest Website</p>
    </div>
    <div style="padding:28px 32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:10px 0;color:#666;font-size:13px;font-weight:600;width:100px;vertical-align:top;">Name</td>
          <td style="padding:10px 0;color:#333;font-size:14px;">${name}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:#666;font-size:13px;font-weight:600;vertical-align:top;">Email</td>
          <td style="padding:10px 0;color:#333;font-size:14px;"><a href="mailto:${email}" style="color:#4CAF50;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:#666;font-size:13px;font-weight:600;vertical-align:top;">Subject</td>
          <td style="padding:10px 0;color:#333;font-size:14px;">${subject}</td>
        </tr>
      </table>
      <div style="margin-top:16px;padding:16px;background:#f8faf7;border-radius:8px;border-left:3px solid #4CAF50;">
        <p style="margin:0 0 4px;color:#666;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
        <p style="margin:0;color:#333;font-size:14px;line-height:1.6;white-space:pre-wrap;">${message}</p>
      </div>
      <div style="margin-top:24px;text-align:center;">
        <a href="${config.frontendURL}/admin" style="display:inline-block;padding:10px 24px;background:#4CAF50;color:#fff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:500;">View in Admin Panel</a>
      </div>
    </div>
    <div style="padding:16px 32px;background:#f8faf7;text-align:center;">
      <p style="margin:0;color:#999;font-size:12px;">This is an automated notification from GreenHarvest.</p>
    </div>
  </div>
</body>
</html>`;

const welcomeEmail = (name) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <div style="max-width:600px;margin:20px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#4CAF50,#2E7D32);padding:32px;text-align:center;">
      <div style="width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,0.2);display:inline-flex;align-items:center;justify-content:center;margin-bottom:12px;">
        <span style="color:#fff;font-size:24px;font-weight:bold;">G</span>
      </div>
      <h1 style="color:#fff;margin:0;font-size:24px;">Welcome to GreenHarvest!</h1>
    </div>
    <div style="padding:32px;text-align:center;">
      <h2 style="color:#333;margin:0 0 12px;font-size:20px;">Hi ${name},</h2>
      <p style="color:#555;font-size:15px;line-height:1.7;margin:0 0 24px;">
        Thank you for joining GreenHarvest — your partner in sustainable agriculture. We're excited to have you on board.
      </p>
      <div style="background:#f8faf7;border-radius:12px;padding:24px;margin:0 0 28px;text-align:left;">
        <p style="margin:0 0 12px;color:#333;font-size:14px;font-weight:600;">Here's what you can do:</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:6px 0;color:#4CAF50;font-size:14px;width:24px;">&#10003;</td>
            <td style="padding:6px 0;color:#555;font-size:14px;">Browse premium seeds, fertilizers &amp; equipment</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#4CAF50;font-size:14px;">&#10003;</td>
            <td style="padding:6px 0;color:#555;font-size:14px;">Write and share agricultural blog posts</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#4CAF50;font-size:14px;">&#10003;</td>
            <td style="padding:6px 0;color:#555;font-size:14px;">List your own products for the community</td>
          </tr>
        </table>
      </div>
      <a href="${config.frontendURL}/products" style="display:inline-block;padding:12px 32px;background:#4CAF50;color:#fff;text-decoration:none;border-radius:8px;font-size:15px;font-weight:500;">Get Started</a>
      <p style="color:#999;font-size:13px;margin:24px 0 0;">If you have any questions, feel free to <a href="${config.frontendURL}/contact" style="color:#4CAF50;">contact us</a>.</p>
    </div>
    <div style="padding:16px 32px;background:#f8faf7;text-align:center;">
      <p style="margin:0;color:#999;font-size:12px;">&copy; ${new Date().getFullYear()} GreenHarvest. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;

module.exports = { sendEmail, contactNotificationEmail, welcomeEmail };
