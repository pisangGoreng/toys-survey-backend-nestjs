import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { StoreCreateDto } from './models/store-create.dto';
import { StoreService } from './store.service';

@Controller('stores')
export class StoreController {
  constructor(private storeService: StoreService) {}

  // @Get()
  // @HttpCode(HttpStatus.OK)
  // async getAll(@Query('page') page = 1): Promise<any> {
  //   const [stores, storesErr] = await this.storeService.findAll();
  //   if (storesErr) throw new BadRequestException(storesErr);

  //   return stores;
  // }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: StoreCreateDto) {
    const [createdStore, createdStoreErr] = await this.storeService.create(
      body,
    );
    if (createdStoreErr) throw new BadRequestException(createdStoreErr);

    return createdStore;
  }
}
