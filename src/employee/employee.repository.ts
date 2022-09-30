import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common/abstact.repository';

import { Connection, Repository } from 'typeorm';
import { Employee } from './models/employee.entity';

@Injectable()
export class EmployeeRepository extends AbstractRepository {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    connection: Connection,
  ) {
    super(employeeRepository, connection);
  }
}
