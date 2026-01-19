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

  async findCompletedLogsByUser(userId: string): Promise<string[]> {
    console.log(userId);
    const result = await this.createQueryBuilder('log')
      .select('DISTINCT log.date', 'date')
      .where('log.userCreated = :userId', { userId })
      .andWhere('log.completed = :completed', { completed: true })
      .orderBy('log.date', 'DESC')
      .getRawMany();
    return result.map(r => r.date);
  }

  async countTotalCompletedByUser(userId: string): Promise<number> {
    return this.count({
      where: {
        userCreated: userId,
        completed: true,
      },
    });
  }
}
