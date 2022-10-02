import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { StoreCreateDto } from './models/store-create.dto';
import { StoreUpdateDto } from './models/store-update.dto';
import { StoreService } from './store.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('stores')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query('page') page = 1): Promise<any> {
    const [stores, storesErr] = await this.storeService.findAll();
    if (storesErr) throw new BadRequestException(storesErr);

    return stores;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async get(@Param('id') id: number): Promise<any> {
    const [store, storeErr] = await this.storeService.findOne({ id });
    if (storeErr) throw new BadRequestException(storeErr);

    return store;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: StoreCreateDto) {
    const [createdStore, createdStoreErr] = await this.storeService.create(
      body,
    );
    if (createdStoreErr) throw new BadRequestException(createdStoreErr);

    return createdStore;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Body() body: StoreUpdateDto,
  ): Promise<any> {
    const [updatedStore, updatedStoreErr] = await this.storeService.update(
      id,
      body,
    );
    if (updatedStoreErr) throw new BadRequestException(updatedStoreErr);

    return updatedStore;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: number): Promise<any> {
    const [deletedStore, deletedStoreErr] = await this.storeService.delete(id);
    if (deletedStoreErr) throw new BadRequestException(deletedStoreErr);

    return deletedStore;
  }
}
