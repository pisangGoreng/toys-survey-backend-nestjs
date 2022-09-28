import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common/abstact.repository';

import { Connection, Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserRepository extends AbstractRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    connection: Connection,
  ) {
    super(userRepository, connection);
  }

  async findOne({ id }): Promise<any[]> {
    const results = [null, null];

    try {
      results[0] = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'role')
        .leftJoinAndSelect('user.store', 'store')
        .where('user.id = :id', { id })
        .select(['user', 'role.id', 'role.name', 'store.location'])
        .getOne();
    } catch (error) {
      console.error(error);
      results[1] = error.driverError.sqlMessage;
    }

    return results;
  }

  async all(): Promise<any[]> {
    const results = [null, null];

    try {
      results[0] = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'role')
        .leftJoinAndSelect('user.store', 'store')
        .select(['user', 'role.id', 'role.name', 'store.location'])
        .getMany();
    } catch (error) {
      console.error(error);
      results[1] = error.driverError.sqlMessage;
    }

    return results;
  }
}
