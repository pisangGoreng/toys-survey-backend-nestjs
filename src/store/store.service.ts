import { Injectable } from '@nestjs/common';
import { StoreRepository } from './store.repository';

@Injectable()
export class StoreService {
  constructor(private storeRepository: StoreRepository) {}

  async create(data): Promise<any> {
    return this.storeRepository.create(data);
  }
}
