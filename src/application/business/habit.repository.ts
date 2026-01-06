import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Habit } from './habit.entity';

@Injectable()
export class HabitRepository extends Repository<Habit> {
  constructor(private dataSource: DataSource) {
    super(Habit, dataSource.createEntityManager());
  }

  async createHabit(data: Partial<Habit>): Promise<Habit> {
    const habit = this.create(data);
    return this.save(habit);
  }
}
