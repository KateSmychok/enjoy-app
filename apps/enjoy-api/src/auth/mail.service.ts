import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  async sendActivationMail(email: string, link: string) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST as string,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER as string,
        pass: 'hhic pthq ixsp ches',
      },
      secure: false,
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER as string,
      to: email,
      subject: 'Enjoy - confirm email',
      text: '',
      html: `
      <div>
        <h1>Hello!</h1>
        <p>Please activate you account by following the link</p>
        <a href="${link}">${link}</a>
      </div>
      `,
    });
  }
}
