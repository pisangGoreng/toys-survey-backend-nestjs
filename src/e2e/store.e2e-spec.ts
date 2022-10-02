import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeService } from '../employee/employee.service';
import { EmployeeModule } from '../employee/employee.module';
import { Employee } from '../employee/models/employee.entity';
import { StoreService } from '../store/store.service';
import { StoreModule } from '../store/store.module';

describe('Employee API', () => {
  let app: INestApplication;
  const urlPath = '/stores';

  let storeService: StoreService;
  let repository: Repository<Employee>;
  let testStore = null;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        StoreModule,
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

    storeService = moduleFixture.get<StoreService>(StoreService);
    repository = moduleFixture.get('StoreRepository');
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  it('/POST - Success create a new store', async () => {
    const { body } = await request(app.getHttpServer())
      .post(urlPath)
      .send({
        location: 'toys living lampung',
        lat: -6.123,
        long: 106.123,
        address:
          'Jl. Alam Sutera Boulevard No.Kav. 21, Pakulonan, Kec. Serpong Utara, Kota Tangerang Selatan, Banten 15325',
      })
      .expect(201);
    testStore = body;

    const [store] = await storeService.findOne({ id: testStore.id });
    expect(testStore.id).toEqual(store.id);
  });

  it(`/GET/:id - Success get a new store created before`, async () => {
    const { body } = await request(app.getHttpServer())
      .get(`${urlPath}/${testStore.id}`)
      .expect(200);

    expect(testStore.id).toEqual(body.id);
  });

  it(`/GET - Success get all the store & contain a new test store `, async () => {
    const { body } = await request(app.getHttpServer())
      .get(urlPath)
      .expect(200);
    const [selectedStore] = body.filter((store) => store.id === testStore.id);

    expect(selectedStore.id).toEqual(testStore.id);
  });

  it(`/PUT - Success update full_name a new test store `, async () => {
    const newName = { location: 'toys living papua' };
    await request(app.getHttpServer())
      .put(`${urlPath}/${testStore.id}`)
      .send(newName)
      .expect(200);

    const [store] = await storeService.findOne({ id: testStore.id });
    expect(store.location).toEqual(newName.location);
  });

  it(`/DELETE - Success delete new test store `, async () => {
    await request(app.getHttpServer()).delete(`${urlPath}/${testStore.id}`);

    const [store] = await storeService.findOne({ id: testStore.id });
    expect(store).toEqual(null);
  });
});
