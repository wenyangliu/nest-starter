import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendEmail() {
    this.mailerService.sendMail({
      to: '18860469266@163.com',
      // to: '1296896549@qq.com',
      from: '1753439422@qq.com',
      subject: '1501',
      html: '<b>猜猜我是谁!</b>'
      // template: 'welcome'
    })
  }
}
