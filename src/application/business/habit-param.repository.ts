import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { HabitParam } from './habit-param.entity';

@Injectable()
export class HabitParamRepository extends Repository<HabitParam> {
  constructor(private dataSource: DataSource) {
    super(HabitParam, dataSource.createEntityManager());
  }
}
