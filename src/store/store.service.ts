import { Injectable } from '@nestjs/common';
import { StoreRepository } from './store.repository';

@Injectable()
export class StoreService {
  constructor(private storeRepository: StoreRepository) {}

  async findAll(): Promise<any> {
    return this.storeRepository.all([]);
  }

  async findOne(condition, relations: any[] = []): Promise<any[]> {
    return await this.storeRepository.findOne(condition, relations);
  }

  async paginate(page = 1, relations: any[] = []): Promise<any[]> {
    return await this.storeRepository.paginate(page, relations);
  }

  async create(data): Promise<any> {
    return this.storeRepository.create(data);
  }

  async update(id: number, data): Promise<any> {
    return this.storeRepository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    return this.storeRepository.delete(id);
  }
}
