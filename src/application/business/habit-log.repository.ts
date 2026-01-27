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

  async findMonthlyLogs(userId: string, year: number, month: number): Promise<any[]> {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    // Calculate end date: start date of next month
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    const endDate = `${nextYear}-${String(nextMonth).padStart(2, '0')}-01`;

    return this.createQueryBuilder('log')
      .leftJoinAndSelect('log.habit', 'habit')
      .leftJoinAndSelect('habit.habitParam', 'habitParam')
      .leftJoinAndSelect('habitParam.alterEgo', 'alterEgo')
      .leftJoin('alterEgo.userAlterEgos', 'userAlterEgo', '"userAlterEgo"."userId"::text = :userId', { userId })
      .where('log.userCreated = :userId', { userId })
      .andWhere('log.completed = :completed', { completed: true })
      .andWhere('log.date >= :startDate', { startDate })
      .andWhere('log.date < :endDate', { endDate })
      .select([
        'log.id',
        'log.date',
        'habit.id',
        'habit.name',
        'habitParam.id',
        'habitParam.icon',
        'alterEgo.id',
        'alterEgo.name',
        'alterEgo.nameFemale',
        'alterEgo.customName',
        'alterEgo.customNameFemale',
        'alterEgo.imageUrl',
        'alterEgo.imageUrlFemale',
        'userAlterEgo.customName',
        'userAlterEgo.customImage'
      ])
      .getRawMany();
  }
}
