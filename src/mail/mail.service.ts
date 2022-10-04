import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as Excel from 'exceljs';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation() {
    const filename = 'Debtors.xlsx'; // 'dummy-dev-xls.xls',
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Debtors');

    worksheet.columns = [
      { header: 'First Name', key: 'firstName' },
      { header: 'Last Name', key: 'lastName' },
      { header: 'Purchase Price', key: 'purchasePrice' },
      { header: 'Payments Made', key: 'paymentsMade' },
    ];
    const data = [
      {
        firstName: 'John',
        lastName: 'Bailey',
        purchasePrice: 1000,
        paymentsMade: 100,
      },
      {
        firstName: 'Leonard',
        lastName: 'Clark',
        purchasePrice: 1000,
        paymentsMade: 150,
      },
    ];
    data.forEach((e) => {
      worksheet.addRow(e);
    });
    const buffer = await workbook.xlsx.writeBuffer();
    console.log(
      '🚀 ~ file: mail.service.ts ~ line 38 ~ MailService ~ sendUserConfirmation ~ buffer',
      buffer,
    );

    const cb = await this.mailerService.sendMail({
      to: 'kp.mumbunan@gmail.com',
      from: '"Support Survey App Team" <support@example.com>', // override default from
      subject: 'Toys Kingdom survey reports',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        name: 'Katherin',
      },
      attachments: [
        {
          filename,
          content: buffer,
          contentType:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      ],
    });

    console.log('check ', cb);
    return cb;
  }
}
