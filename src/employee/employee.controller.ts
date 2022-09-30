import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeCreateDto } from './models/employee-create.dto';
import { EmployeeUpdateDto } from './models/employee-update.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async all() {
    const [employees, employeesErr] = await this.employeeService.findAll();
    if (employeesErr) throw new BadRequestException(employeesErr);

    return employees;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async get(@Param('id') id: number): Promise<any> {
    const [employee, employeeErr] = await this.employeeService.findOne({ id });
    if (employeeErr) throw new BadRequestException(employeeErr);

    return employee;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: EmployeeCreateDto) {
    const [createdEmployee, createdEmployeeErr] =
      await this.employeeService.create(body);

    if (createdEmployeeErr) throw new BadRequestException(createdEmployeeErr);

    return createdEmployee;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Body() body: EmployeeUpdateDto,
  ): Promise<any> {
    const [updatedEmployee, updatedEmployeeErr] =
      await this.employeeService.update(id, body);
    if (updatedEmployeeErr) throw new BadRequestException(updatedEmployeeErr);

    return updatedEmployee;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: number): Promise<any> {
    const [deletedUser, deletedUserErr] = await this.employeeService.delete(id);
    if (deletedUserErr) throw new BadRequestException(deletedUserErr);

    return deletedUser;
  }
}
