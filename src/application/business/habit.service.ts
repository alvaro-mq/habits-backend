import { Injectable } from '@nestjs/common';
import { HabitRepository } from './habit.repository';
import { Habit } from './habit.entity';
import { UserRepository } from '../user/user.repository';
import { CreateHabitDto } from './create-habit.dto';
import { HabitParamRepository } from './habit-param.repository';
import { AlterEgo } from './alterego.entity';

@Injectable()
export class HabitService {
  constructor(
    private readonly habitRepository: HabitRepository,
    private readonly userRepository: UserRepository,
    private readonly habitParamRepository: HabitParamRepository,
  ) {}

  async createHabit(
    habitDto: CreateHabitDto,
    userId: string,
  ): Promise<Habit> {
    const habit = new Habit();
    habit.name = habitDto.name;
    habit.description = habitDto.description;
    habit.reminderTime = habitDto.reminderTime;
    habit.reminderDays = habitDto.reminderDays;
    habit.userCreated = userId;

    const [user, habitParam] = await Promise.all([
      this.userRepository.findOne({ where: { id: userId } }),
      this.habitParamRepository.findOne({ where: { id: habitDto.habitParamId } }),
    ]);

    if (!habitParam) {
      throw new Error('HabitParam not found');
    }

    habit.user = user;
    habit.habitParam = habitParam;

    return this.habitRepository.createHabit(habit);
  }

  async getAlterEgosWithHabits(userId: string): Promise<any[]> {
    const habits = await this.habitRepository.find({
      where: { user: { id: userId } },
      relations: ['habitParam', 'habitParam.alterEgo'],
    });

    const alterEgoMap = new Map<string, any>();

    for (const habit of habits) {
      const alterEgo = habit.habitParam.alterEgo;
      const habitParam = habit.habitParam;

      if (!alterEgoMap.has(alterEgo.id)) {
        alterEgoMap.set(alterEgo.id, {
          ...alterEgo,
          habits: new Map<string, any>(),
        });
      }

      const aeEntry = alterEgoMap.get(alterEgo.id);
      if (!aeEntry.habits.has(habitParam.id)) {
        aeEntry.habits.set(habitParam.id, {
          ...habitParam,
          habits: [],
        });
      }

      const hpEntry = aeEntry.habits.get(habitParam.id);
      
      // Clean up relations to avoid circularity or redundant data in the response
      const { habitParam: _, ...habitData } = habit;
      hpEntry.habits.push(habitData);
    }

    // Convert Maps back to arrays
    const result = Array.from(alterEgoMap.values()).map((ae) => {
      const populatedAe = { ...ae };
      populatedAe.habits = Array.from(ae.habits.values()).map((hp: any) => {
        const cleanedHp = { ...hp };
        delete cleanedHp.alterEgo; // Remove relation to parent
        return cleanedHp;
      });
      return populatedAe;
    });

    return result;
  }
}
