import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as Excel from 'exceljs';

import { ReceiptRepository } from './receipt.repository';
import * as moment from 'moment';
import { getMonthName, getMonthNumber } from 'src/helpers/date';

@Injectable()
export class ReceiptService {
  constructor(private receiptRepository: ReceiptRepository) {}

  async findAll(): Promise<any> {
    return this.receiptRepository.all();
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

  async create(data): Promise<any> {
    return this.receiptRepository.create(data);
  }

  async transformReceiptsToExcel({ receipts }) {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('sheet 1');
    worksheet.columns = [
      { header: 'No', key: 'no' },
      { header: 'Date', key: 'date' },
      { header: 'No Receipt', key: 'noReceipt' },
      { header: 'Name', key: 'name' },
      { header: 'nik', key: 'nik' },
      { header: 'rating', key: 'rating' },
    ];

    const rows = receipts.map((receipt, index) => {
      const { created_at, receipt_no, employee, rating } = receipt;
      return {
        no: index + 1,
        date: moment(created_at).format('DD-MM-YYYY'),
        noReceipt: receipt_no,
        name: employee.full_name,
        nik: employee.nik,
        rating,
      };
    });

    rows.forEach((row) => worksheet.addRow(row));
    return await workbook.xlsx.writeBuffer();
  }
}
