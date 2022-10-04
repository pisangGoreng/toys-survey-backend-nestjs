import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mails')
export class MailController {
  constructor(private mailService: MailService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async all() {
    return this.mailService.sendUserConfirmation();
  }
}
