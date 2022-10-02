import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeService } from '../employee/employee.service';
import { EmployeeModule } from '../employee/employee.module';
import { Employee } from '../employee/models/employee.entity';

describe('Employee API', () => {
  let app: INestApplication;
  const urlPath = '/employees';

  let employeeService: EmployeeService;
  let repository: Repository<Employee>;
  let testEmployee = null;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        EmployeeModule,
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

    employeeService = moduleFixture.get<EmployeeService>(EmployeeService);
    repository = moduleFixture.get('EmployeeRepository');
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  it('/POST - Success create a new employee', async () => {
    const { body } = await request(app.getHttpServer())
      .post(urlPath)
      .send({
        full_name: 'kucing',
        nik: '777',
        image_urlPath:
          'https://drive.google.com/file/d/1sk8_yjGyQ9paDoycT_KGY6-zpf0N33QW/view?usp=sharing',
        user: 1,
      })
      .expect(201);
    testEmployee = body;

    const [employee] = await employeeService.findOne({ id: testEmployee.id });
    expect(testEmployee.id).toEqual(employee.id);
  });

  it(`/GET/:id - Success get a new employee created before`, async () => {
    const { body } = await request(app.getHttpServer())
      .get(`${urlPath}/${testEmployee.id}`)
      .expect(200);

    expect(testEmployee.id).toEqual(body.id);
  });

  it(`/GET - Success get all the employee & contain a new test employee `, async () => {
    const { body } = await request(app.getHttpServer())
      .get(urlPath)
      .expect(200);
    const [selectedEmployee] = body.filter(
      (employee) => employee.id === testEmployee.id,
    );

    expect(selectedEmployee.id).toEqual(testEmployee.id);
  });

  it(`/PUT - Success update full_name a new test employee `, async () => {
    const newName = { full_name: 'endy' };
    await request(app.getHttpServer())
      .put(`${urlPath}/${testEmployee.id}`)
      .send(newName)
      .expect(200);

    const [employee] = await employeeService.findOne({ id: testEmployee.id });
    expect(employee.full_name).toEqual(newName.full_name);
  });

  it(`/DELETE - Success delete new test employee `, async () => {
    await request(app.getHttpServer()).delete(`${urlPath}/${testEmployee.id}`);

    const [employee] = await employeeService.findOne({ id: testEmployee.id });
    expect(employee).toEqual(null);
  });
});
