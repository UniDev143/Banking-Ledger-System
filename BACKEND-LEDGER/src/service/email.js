const nodemailer = require('nodemailer');
const isEmailEnabled = process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true';

function createEmailTransporter() {
  if (!isEmailEnabled) {
    return null;
  }

  const emailUser = process.env.EMAIL_USER;
  const appPassword = process.env.EMAIL_APP_PASSWORD;

  if (emailUser && appPassword) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: appPassword,
      },
    });
  }

  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const refreshToken = process.env.REFRESH_TOKEN;
  const accessToken = process.env.ACCESS_TOKEN;

  if (emailUser && clientId && clientSecret && refreshToken) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: emailUser,
        clientId,
        clientSecret,
        refreshToken,
        accessToken,
      },
    });
  }

  console.warn('Email notifications enabled, but required credentials are missing.');
  console.warn('Use EMAIL_USER + EMAIL_APP_PASSWORD (recommended) or OAuth2 credentials.');
  return null;
}

const transporter = createEmailTransporter();

if (isEmailEnabled && transporter) {
  transporter.verify((error) => {
    if (error) {
      console.error('Email verification failed. Continuing without email delivery:', error.message);
    } else {
      console.log('Email server is ready to send messages');
    }
  });
}


// Function to send email
const sendEmail = async (to, subject, text, html) => {
  if (!isEmailEnabled || !transporter) {
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email. Continuing request without failing API:', error.message);
  }
};

async function sendRegistrationEmail(to, name) {
  const subject = 'Welcome to Backend Ledger!';
  const text = `Hi ${name},\n\nThank you for registering with Backend Ledger. We're excited to have you on board!\n\nBest regards,\nThe Backend Ledger Team`;
  const html = `<p>Hi ${name},</p><p>Thank you for registering with Backend Ledger. We're excited to have you on board!</p><p>Best regards,<br>The Backend Ledger Team</p>`;
    await sendEmail(to, subject, text, html);
}

async function sendTransactionEmail(to, name, amount, fromAccount, toAccount) {
  const subject = 'Transaction Completed!';
  const text = `Hi ${name},\n\nYour transaction of $${amount} has been completed successfully from account ${fromAccount} to account ${toAccount}.\n\nBest regards,\nThe Backend Ledger Team`;
  const html = `<p>Hi ${name},</p><p>Your transaction of $${amount} has been completed successfully from account ${fromAccount} to account ${toAccount}.</p><p>Best regards,<br>The Backend Ledger Team</p>`;
  await sendEmail(to, subject, text, html);
}

async function sendTranastionFailedEmail(to, name, amount, fromAccount, toAccount) {
  const subject = 'Transaction Failed!';
  const text = `Hi ${name},\n\nUnfortunately, your transaction of $${amount} from account ${fromAccount} to account ${toAccount} has failed. Please try again or contact support for assistance.\n\nBest regards,\nThe Backend Ledger Team`;
  const html = `<p>Hi ${name},</p><p>Unfortunately, your transaction of $${amount} from account ${fromAccount} to account ${toAccount} has failed. Please try again or contact support for assistance.</p><p>Best regards,<br>The Backend Ledger Team</p>`;
  await sendEmail(to, subject, text, html);
}

async function sendRewardEmail(to, name, amount, accountId) {
  const subject = 'Joining Reward Added!';
  const text = `Hi ${name},\n\nYou have received a joining reward of $${amount} in account ${accountId}.\n\nBest regards,\nThe Backend Ledger Team`;
  const html = `<p>Hi ${name},</p><p>You have received a joining reward of $${amount} in account ${accountId}.</p><p>Best regards,<br>The Backend Ledger Team</p>`;
  await sendEmail(to, subject, text, html);
}


module.exports = {
  sendEmail,
  sendRegistrationEmail,
  sendTranastionFailedEmail,
  sendTransactionEmail,
  sendRewardEmail
};