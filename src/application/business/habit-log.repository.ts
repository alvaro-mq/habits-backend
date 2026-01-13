import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { HabitLog } from './habit-log.entity';

@Injectable()
export class HabitLogRepository extends Repository<HabitLog> {
  constructor(private dataSource: DataSource) {
    super(HabitLog, dataSource.createEntityManager());
  }

  async createLog(data: Partial<HabitLog>): Promise<HabitLog> {
    const log = this.create(data);
    return this.save(log);
  }
}
