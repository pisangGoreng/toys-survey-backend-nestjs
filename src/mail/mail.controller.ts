import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ReceiptService } from 'src/receipt/receipt.service';
import { UserService } from 'src/user/user.service';
import { MailService } from './mail.service';

@Controller('mails')
export class MailController {
  constructor(
    private mailService: MailService,
    private receiptService: ReceiptService,
    private userService: UserService,
  ) {}

  @Get(':store_id/:month/:year')
  @HttpCode(HttpStatus.OK)
  async sendMonthlySurveyReport(
    @Param('store_id') store_id = 1,
    @Param('month') month = 'january',
    @Param('year') year = 2022,
  ) {
    const [reportByStoreId, reportByStoreIdErr] =
      await this.receiptService.findAllByDate({
        store_id,
        month,
        year,
      });
    if (reportByStoreIdErr) throw new BadRequestException(reportByStoreIdErr);

    const [userStore, userStoreErr] = await this.userService.findOne({
      id: store_id,
    });

    if (userStoreErr) throw new BadRequestException(userStoreErr);

    const contentBuffer = await this.receiptService.transformReceiptsToExcel({
      receipts: reportByStoreId,
    });

    const sendEmail = this.mailService.sendMonthlySurveyReport({
      contentBuffer,
      storeDetails: userStore,
      month,
      year,
    });

    return sendEmail;
  }
}
