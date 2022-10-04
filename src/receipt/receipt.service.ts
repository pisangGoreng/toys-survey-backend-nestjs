import { Injectable } from '@nestjs/common';
import { ReceiptRepository } from './receipt.repository';
import * as moment from 'moment';
import { getMonthName, getMonthNumber } from 'src/helpers/date';

@Injectable()
export class ReceiptService {
  constructor(private receiptRepository: ReceiptRepository) {}

  async findAll(): Promise<any> {
    return this.receiptRepository.all();
  }

  async findOne(condition, relations: any[] = []): Promise<any[]> {
    return await this.receiptRepository.findOne(condition, relations);
  }

  async findAllByDate(condition): Promise<any[]> {
    const { store_id, month, year } = condition;

    const dateRange = {
      startDate: moment()
        .set({ year, month: getMonthNumber(month), date: 1 })
        .format('YYYY-MM-DD')
        .toString(),
      endDate: moment()
        .set({
          year,
          month: getMonthNumber(month),
          date: moment().set({ month }).daysInMonth(),
        })
        .format('YYYY-MM-DD')
        .toString(),
    };

    console.log(dateRange);
    console.log('START ');
    console.log(new Date(dateRange.startDate));
    console.log('');
    console.log('END ');
    console.log(new Date(dateRange.endDate));

    return await this.receiptRepository.findAllByDate({
      store_id,
      dateRange,
    });
  }

  async paginate(page = 1, relations: any[] = []): Promise<any[]> {
    return await this.receiptRepository.paginate(page, relations);
  }

  async create(data): Promise<any> {
    return this.receiptRepository.create(data);
  }

  async update(id: number, data): Promise<any> {
    return this.receiptRepository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    return this.receiptRepository.delete(id);
  }
}
