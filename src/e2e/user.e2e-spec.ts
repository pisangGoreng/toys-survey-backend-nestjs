import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/models/user.entity';
import { Repository } from 'typeorm';

describe('User API', () => {
  let app: INestApplication;
  const urlPath = '/users';

  let userService: UserService;
  let repository: Repository<User>;
  let testUser = null;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
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

    userService = moduleFixture.get<UserService>(UserService);
    repository = moduleFixture.get('UserRepository');
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  it('/POST - Success create a new user', async () => {
    const { body } = await request(app.getHttpServer())
      .post(urlPath)
      .send({
        email: 'mgrtoys1234.palemsemi@toyskingdom.co.id',
        password: 'Kenzo007',
        store: 1,
        role: 1,
      })
      .expect(201);
    testUser = body;

    const [user] = await userService.findOne({ id: testUser.id });
    expect(testUser.id).toEqual(user.id);
  });

  it(`/GET/:id - Success get a new user created before`, async () => {
    // , a user id with id: ${testUser.id}
    const { body } = await request(app.getHttpServer())
      .get(`${urlPath}/${testUser.id}`)
      .expect(200);

    expect(testUser.id).toEqual(body.id);
  });

  it(`/GET - Success get all the user & contain a new test user `, async () => {
    const { body } = await request(app.getHttpServer())
      .get(urlPath)
      .expect(200);
    const [selectedUser] = body.filter((user) => user.id === testUser.id);

    expect(selectedUser.id).toEqual(testUser.id);
  });

  it(`/PUT - Success update full_name a new test user `, async () => {
    const newEmail = {
      email: 'mgrtoys777.palemsemi@toyskingdom.co.id',
    };
    await request(app.getHttpServer())
      .put(`${urlPath}/${testUser.id}`)
      .send(newEmail)
      .expect(200);

    const [user] = await userService.findOne({ id: testUser.id });
    expect(user.email).toEqual(newEmail.email);
  });

  it(`/DELETE - Success delete new test user `, async () => {
    await request(app.getHttpServer()).delete(`${urlPath}/${testUser.id}`);

    const [user] = await userService.findOne({ id: testUser.id });
    expect(user).toEqual(null);
  });
});
