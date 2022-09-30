import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from './employee.repository';

@Injectable()
export class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}

  async findAll(): Promise<any> {
    return this.employeeRepository.all();
  }

  async findOne(condition, relations: any[] = []): Promise<any[]> {
    return await this.employeeRepository.findOne(condition, relations);
  }

  async paginate(page = 1, relations: any[] = []): Promise<any[]> {
    return await this.employeeRepository.paginate(page, relations);
  }

  async create(data): Promise<any> {
    return this.employeeRepository.create(data);
  }

  async update(id: number, data): Promise<any> {
    return this.employeeRepository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    return this.employeeRepository.delete(id);
  }
}
