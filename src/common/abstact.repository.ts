import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';

@Injectable()
export abstract class AbstractRepository {
  connectionDb: any;

  constructor(
    protected readonly repository: Repository<any>,
    private connection: Connection,
  ) {
    this.connectionDb = this.connection.createQueryRunner();
  }

  async all(relations: any[] = []): Promise<any[]> {
    const results = [null, null];

    try {
      results[0] = await this.repository.find({ relations });
    } catch (error) {
      console.error(error);
      results[1] = error.driverError.sqlMessage;
    }

    return results;
  }

  async findOne(condition, relations: any[] = []): Promise<any[]> {
    const results = [null, null];

    try {
      results[0] = await this.repository.findOne({
        where: condition,
        relations,
      });
    } catch (error) {
      console.error(error);
      results[1] = error.driverError.sqlMessage;
    }

    return results;
  }

  async paginate(page = 1, relations: any[] = []): Promise<any[]> {
    const results = [null, null];

    try {
      const take = 2; // set berapa banyak item yg ditampilkan per page
      const [data, total] = await this.repository.findAndCount({
        take,
        skip: (page - 1) * take, // offset
        relations,
      });

      results[0] = {
        data,
        meta: {
          total,
          page,
          last_page: Math.ceil(total / take),
        },
      };
    } catch (error) {
      results[1] = error.driverError.sqlMessage;
    }

    console.log(results);
    return results;
  }

  async create(data): Promise<any[]> {
    const results = [null, null];

    try {
      results[0] = await this.repository.save({
        ...data,
        created_at: new Date(),
        update_at: new Date(),
      });
    } catch (error) {
      console.error(error);
      results[1] = error.driverError.sqlMessage;
    }

    return results;
  }

  async update(id: number, data): Promise<any[]> {
    const results = [null, null];

    try {
      results[0] = await this.repository.update(id, {
        ...data,
        update_at: new Date(),
      });
    } catch (error) {
      results[1] = error.driverError.sqlMessage;
    }

    return results;
  }

  async delete(id: number): Promise<any[]> {
    const results = [null, null];

    try {
      results[0] = await this.repository.delete(id);
    } catch (error) {
      console.error(error);
      results[1] = error.driverError.sqlMessage;
    }

    return results;
  }
}
