import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { StoreModule } from './store/store.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

const isEnable = ['dev', 'dev-local'].includes(process.env.NODE_ENV);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: isEnable,
      // synchronize: isEnable,
      entities: [],
      logging: isEnable,
    }),
    PermissionModule,
    RoleModule,
    UserModule,
    StoreModule,
    AuthModule,
    CommonModule,
  ],
})
export class AppModule {}
