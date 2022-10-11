import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PermissionService } from 'src/permission/permission.service';
import { PermissionModule } from 'src/permission/permission.module';
import { Permission } from 'src/permission/models/permission.entity';

describe('Permission API', () => {
  let app: INestApplication;
  const urlPath = '/permissions';

  let permissionService: PermissionService;
  let repository: Repository<Permission>;
  const testReceipt = null;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        PermissionModule,
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

    permissionService = moduleFixture.get<PermissionService>(PermissionService);
    repository = moduleFixture.get('PermissionRepository');
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  it(`/GET - Success get all permission `, async () => {
    const { body } = await request(app.getHttpServer())
      .get(urlPath)
      .expect(200);

    expect(body[0].name).toEqual('view_users');
  });
});
