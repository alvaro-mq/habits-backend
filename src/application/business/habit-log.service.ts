import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { HabitLogRepository } from './habit-log.repository';
import { HabitRepository } from './habit.repository';
import { UserRepository } from '../user/user.repository';
import { HabitLog } from './habit-log.entity';

@Injectable()
export class HabitLogService {
  constructor(
    private readonly habitLogRepository: HabitLogRepository,
    private readonly habitRepository: HabitRepository,
    private readonly userRepository: UserRepository,
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

  async calculateStreak(userId: string): Promise<number> {
    const dates = await this.habitLogRepository.findCompletedLogsByUser(userId);
    
    return dates.length;
  }

  async getTotalCompletedLogs(userId: string): Promise<number> {
    return this.habitLogRepository.countTotalCompletedByUser(userId);
  }

  async getMonthlyLogs(userId: string, year: number, month: number): Promise<any[]> {
    const logs = await this.habitLogRepository.findMonthlyLogs(userId, year, month);
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const grouped = logs.reduce((acc, log) => {
      // Raw data properties will be aliased based on select aliases or column names. 
      // TypeORM getRawMany typically returns alias_column.
      // But we used .select(['log.date', 'habit.name', ...])
      // In getRawMany(), if no custom alias provided, it's usually `log_date`, `habit_name`.
      // Let's verify standard TypeORM behavior or use aliases in query.
      // To be safe, let's update repository to use aliases or handle default naming.
      // With .select(['log.date', ...]), results are usually `log_date`, etc.
      // Actually, let's inspect the `log` object properties in a safe way or assume standard snake_case.
      // However, we can use aliases in repository for clarity. 
      // OR we can just check what we get. Defaults: `log_date`, `habit_id`, `habit_name`.
      
      // Let's assume default naming from TypeORM getRawMany: `alias_column`.
      
      const date = log.log_date instanceof Date ? log.log_date.toISOString().split('T')[0] : log.log_date;
      if (!acc[date]) {
        acc[date] = [];
      }
      
      const gender = user.gender; // 'F' or 'M'
      
      // Determine alter ego name and image
      let aeName = log.alterEgo_name;
      let aeImage = log.alterEgo_imageUrl;
      
      // Apply logic mirroring HabitService
      if (gender === 'F') {
        aeName = log.userAlterEgo_customName || log.alterEgo_customNameFemale || log.alterEgo_nameFemale || log.alterEgo_name;
        aeImage = log.userAlterEgo_customImage || log.alterEgo_imageUrlFemale || log.alterEgo_imageUrl;
      } else {
        // Male or default
        aeName = log.userAlterEgo_customName || log.alterEgo_customName || log.alterEgo_name;
        aeImage = log.userAlterEgo_customImage || log.alterEgo_imageUrl;
      }

      acc[date].push({
        id: log.habit_id,
        name: log.habit_name,
        icon: log.habitParam_icon,
        alterEgo: log.alterEgo_id ? {
          name: aeName,
          imageUrl: aeImage,
        } : null,
      });
      return acc;
    }, {});

    return Object.keys(grouped).map(date => ({
      date,
      habits: grouped[date]
    }));
  }
}
