import nodemailer from 'nodemailer';

export const sendVerifyOtp = async (data) => {
  const from = 'Nodemailer Chat App <ryanoktaviansaputra9@gmail.com>';
  const to = data.email;
  let subject;
  const message = `${data.otp}`;
  let output;
  if (data.from === 'forgotPassword') {
    subject = 'Reset Password';
    output = `<p>Reset Password</p>
   <h3>Reset Password</h3><p>Email: ${data.email}</p>
   <p>Do not share this code, the OTP will expire on ${data.formattedDate}</p>
   <h3>OTP</h3>
   <p>${data.otp}</p>`;
  } else if (data.from === 'verifyAccount') {
    subject = 'Verify Account';
    output = `<p>Verify Account</p>
   <h3>Verify Account</h3> <p>Email: ${data.email}</p>
   <p>Do not share this code, the OTP will expire on ${data.formattedDate}</p>
   <h3>OTP</h3>
   <p>${data.otp}</p>`;
  }
  const mailOptions = {
    from,
    to,
    subject,
    text: message,
    html: output,
  };
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ryanoktaviansaputra9@gmail.com',
      pass: 'jwcfulsnveddqurr',
    },
  });
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
    return info;
  });
};

export const sendPasswordOtp = (data) => {
  const from = 'Nodemailer Chat App <ryanoktaviansaputra9@gmail.com>';
  const to = data.email;
  const subject = 'Reset Password';
  const message = `${data.otp}`;
  const output = `<p>Reset Password</p>
    <h3>Reset Password</h3>
    <p>Email: ${data.email}</p>
    <p>Do not share this code, the OTP will expire on ${data.formattedDate}</p>
    <h3>OTP</h3>
    <p>${data.otp}</p>`;
  const mailOptions = {
    from,
    to,
    subject,
    text: message,
    html: output,
  };
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
    return info;
  });
};
