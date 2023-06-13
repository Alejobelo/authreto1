import * as nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'arno.mann4@ethereal.email',
    pass: 'tY4vRG4be2RfbzaJAZ',
  },
});

//   async sendPasswordResetEmail(
//     email: string,
//     resetToken: string,
//   ): Promise<void> {
//     const mailOptions = {
//       from: 'alejobelo25@gmail.com',
//       to: email,
//       subject: 'Password Reset',
//       text: `You have requested to reset your password. Your reset token is: ${resetToken}`,
//     };

//     await this.transporter.sendMail(mailOptions);
//   }
