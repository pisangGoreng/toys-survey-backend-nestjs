import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common/abstact.repository';

import { Connection, Repository } from 'typeorm';
import { Receipt } from './models/receipt.entity';

@Injectable()
export class ReceiptRepository extends AbstractRepository {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepository: Repository<Receipt>,
    connection: Connection,
  ) {
    super(receiptRepository, connection);
  }

  async create(data): Promise<any[]> {
    const results = [null, null];

    try {
      console.log('cek REPO NYA BOS', data);
      results[0] = await this.receiptRepository.save({
        ...data,
        created_at: new Date(),
        update_at: new Date(),
      });
    } catch (error) {
      console.error(error);
      results[1] = error.driverError.sqlMessage;
    }

    return results;
  }

  async all(): Promise<any[]> {
    const results = [null, null];

    try {
      results[0] = await this.receiptRepository
        .createQueryBuilder('receipt')
        .leftJoinAndSelect('receipt.employee', 'employee')
        .leftJoinAndSelect('receipt.user', 'user')
        .leftJoinAndSelect('user.store', 'store')
        .getMany();
    } catch (error) {
      console.error(error);
      results[1] = error.driverError.sqlMessage;
    }

    return results;
  }

  async findAllByDate({ store_id, dateRange }): Promise<any[]> {
    const results = [null, null];

    try {
      results[0] = await this.receiptRepository
        .createQueryBuilder('receipt')
        .leftJoinAndSelect('receipt.employee', 'employee')
        .leftJoinAndSelect('receipt.user', 'user')
        .leftJoinAndSelect('user.store', 'store')
        .where('receipt.created_at > :startDate', {
          startDate: new Date(dateRange.startDate),
        })
        .andWhere('receipt.created_at < :endDate', {
          endDate: new Date(dateRange.endDate),
        })
        .andWhere('receipt.user_id = :store_id', {
          store_id,
        })
        .getMany();
    } catch (error) {
      console.error(error);
      results[1] = error.driverError.sqlMessage;
    }

    return results;
  }
}
