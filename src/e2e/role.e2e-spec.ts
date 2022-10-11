import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from 'src/role/models/role.entity';
import { RoleService } from 'src/role/role.service';
import { RoleModule } from 'src/role/role.module';

describe('Role API', () => {
  let app: INestApplication;
  const urlPath = '/roles';

  let roleService: RoleService;
  let repository: Repository<Role>;
  let roleStore = null;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        RoleModule,
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

    roleService = moduleFixture.get<RoleService>(RoleService);
    repository = moduleFixture.get('RoleRepository');
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  it('/POST - Success create a new role', async () => {
    const { body } = await request(app.getHttpServer())
      .post(urlPath)
      .send({
        name: 'test_role_7',
        permissions: [7, 8, 9],
      })
      .expect(201);
    roleStore = body;

    const [store] = await roleService.findOne({ id: roleStore.id });
    expect(roleStore.id).toEqual(store.id);
  });

  it(`/GET/:id - Success get a new role created before`, async () => {
    const { body } = await request(app.getHttpServer())
      .get(`${urlPath}/${roleStore.id}`)
      .expect(200);

    expect(roleStore.id).toEqual(body.id);
  });

  it(`/GET - Success get all the role & contain a new test role `, async () => {
    const { body } = await request(app.getHttpServer())
      .get(urlPath)
      .expect(200);
    const [selectedStore] = body.filter((store) => store.id === roleStore.id);

    expect(selectedStore.id).toEqual(roleStore.id);
  });

  it(`/PUT - Success update name & permissions a new test role `, async () => {
    const newRole = {
      name: 'test_role_46',
      permissions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
    await request(app.getHttpServer())
      .put(`${urlPath}/${roleStore.id}`)
      .send(newRole)
      .expect(200);

    const [role] = await roleService.findOne({ id: roleStore.id }, [
      'permissions',
    ]);
    expect(role.name).toEqual(newRole.name);
  });

  it(`/DELETE - Success delete new test role `, async () => {
    await request(app.getHttpServer()).delete(`${urlPath}/${roleStore.id}`);

    const [store] = await roleService.findOne({ id: roleStore.id });
    expect(store).toEqual(null);
  });
});
