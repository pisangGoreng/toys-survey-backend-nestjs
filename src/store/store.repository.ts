import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common/abstact.repository';

import { Connection, Repository } from 'typeorm';
import { Store } from './models/store.entity';

@Injectable()
export class StoreRepository extends AbstractRepository {
  constructor(
    @InjectRepository(Store) private readonly roleRepository: Repository<Store>,
    connection: Connection,
  ) {
    super(roleRepository, connection);
  }
}
