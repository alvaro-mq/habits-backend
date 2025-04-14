import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Advice } from './advice.entity';

@Injectable()
export class AdviceRepository extends Repository<Advice> {
  constructor(private dataSource: DataSource) {
    super(Advice, dataSource.createEntityManager());
  }

  async createAdvice(data: Partial<Advice>): Promise<Advice> {
    const advice = this.create(data);
    return this.save(advice);
  }

  async getAdvice(adviceId: string): Promise<Advice> {
    return this.findOne({ where: { id: adviceId } });
  }

  async getAdvicies(): Promise<Advice[]> {
    const advicies = await this.find();

    return advicies;
  }
}
