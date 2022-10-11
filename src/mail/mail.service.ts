import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMonthlySurveyReport({ contentBuffer, storeDetails, month, year }) {
    let email = [null, null];
    try {
      const filename = `rating receipts ${storeDetails.store.location} ${month}-${year}.xlsx`;
      const sendEmail = await this.mailerService.sendMail({
        to: storeDetails.email,
        from: '"Support Survey App Team" <support@example.com>',
        subject: `Toys Kingdom satisfaction survey reports for ${month} ${year}`,
        template: './survey_report', // `.hbs` extension is appended automatically
        context: {
          name: storeDetails.store.location,
          date: `${month} ${year}`,
        },
        attachments: [
          {
            filename,
            content: contentBuffer,
            contentType:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
        ],
      });

      email = [sendEmail, null];
    } catch (error) {
      email = [null, error];
    }

    return email;
  }
}
