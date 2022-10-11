import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Receipt } from 'src/receipt/models/receipt.entity';
import { ReceiptModule } from 'src/receipt/receipt.module';
import { ReceiptService } from 'src/receipt/receipt.service';

describe('Receipt API', () => {
  let app: INestApplication;
  const urlPath = '/receipts';

  let receiptService: ReceiptService;
  let repository: Repository<Receipt>;
  let testReceipt = null;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ReceiptModule,
        TypeOrmModule.forRoot({
          type: process.env.DB_TYPE as any,
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [__dirname + '/../**/*.entity.ts'],
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    receiptService = moduleFixture.get<ReceiptService>(ReceiptService);
    repository = moduleFixture.get('ReceiptRepository');
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  it('/POST - Success create a new receipt', async () => {
    const { body } = await request(app.getHttpServer())
      .post(urlPath)
      .send({
        receipt_no: '119',
        user_id: 41,
        employee_id: 31,
        rating: 1,
      })
      .expect(201);
    testReceipt = body;

    const [employee] = await receiptService.findOne({ id: testReceipt.id });
    expect(testReceipt.id).toEqual(employee.id);
  });

  it(`/GET - Success get all the receipt a new test receipt `, async () => {
    const { body } = await request(app.getHttpServer())
      .get(urlPath)
      .expect(200);
    const [selectedEmployee] = body.filter(
      (employee) => employee.id === testReceipt.id,
    );

    expect(selectedEmployee.id).toEqual(testReceipt.id);
  });
});
