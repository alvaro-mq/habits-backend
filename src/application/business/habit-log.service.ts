import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { HabitLogRepository } from './habit-log.repository';
import { HabitRepository } from './habit.repository';
import { HabitLog } from './habit-log.entity';

@Injectable()
export class HabitLogService {
  constructor(
    private readonly habitLogRepository: HabitLogRepository,
    private readonly habitRepository: HabitRepository,
  ) {}

  async createLog(habitId: string, completed: boolean, userId: string): Promise<HabitLog> {
    const habit = await this.habitRepository.findOne({ where: { id: habitId } });

    if (!habit) {
      throw new NotFoundException(`Habit with ID ${habitId} not found`);
    }

    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    // Check if log already exists for today
    let log = await this.habitLogRepository.findOne({
      where: {
        habit: { id: habitId },
        date: today,
      },
    });

    if (log) {
      log.completed = completed;
      return this.habitLogRepository.save(log);
    }

    log = new HabitLog();
    log.habit = habit;
    log.date = today;
    log.completed = completed;
    log.userCreated = userId;

    return this.habitLogRepository.createLog(log);
  }
}
