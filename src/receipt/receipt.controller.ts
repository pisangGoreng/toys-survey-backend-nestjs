import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  BadRequestException,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ReceiptCreateDto } from './models/receipt-create.dto';
import { ReceiptService } from './receipt.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('receipts')
export class ReceiptController {
  constructor(private receiptService: ReceiptService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async all() {
    const [receipts, receiptsErr] = await this.receiptService.findAll();
    if (receiptsErr) throw new BadRequestException(receiptsErr);

    return receipts;
  }

  @Get(':store_id/:month/:year')
  @HttpCode(HttpStatus.OK)
  async get(
    @Param('store_id') store_id = 1,
    @Param('month') month = 'january',
    @Param('year') year = 2022,
  ): Promise<any> {
    const [receipts, receiptsErr] = await this.receiptService.findAllByDate({
      store_id,
      month,
      year,
    });
    if (receiptsErr) throw new BadRequestException(receiptsErr);

    return {
      store_id,
      month,
      year,
      receipts,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: ReceiptCreateDto) {
    const [createdReceipt, createdReceiptErr] =
      await this.receiptService.create(body);
    if (createdReceiptErr) throw new BadRequestException(createdReceiptErr);

    return createdReceipt;
  }
}
